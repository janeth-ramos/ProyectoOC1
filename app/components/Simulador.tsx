"use client";

import { useMemo, useState } from "react";
import { Histogram } from "./Histogram";
import { porcentaje, simular, usdMillones, type SimParams } from "../lib/montecarlo";

const INICIAL: SimParams = {
  ley: 0.8,
  tonelaje: 2.5,
  precio: 4,
  costo: 28,
  iteraciones: 4000,
};

const ITERACIONES = [1000, 4000, 10000];

type ConfigSlider = {
  key: keyof Pick<SimParams, "ley" | "tonelaje" | "precio" | "costo">;
  etiqueta: string;
  unidad: string;
  min: number;
  max: number;
  step: number;
  decimales: number;
  nota: string;
};

const SLIDERS: ConfigSlider[] = [
  { key: "ley", etiqueta: "Ley de cobre", unidad: "% Cu", min: 0.2, max: 1.6, step: 0.05, decimales: 2, nota: "incertidumbre ±16%" },
  { key: "tonelaje", etiqueta: "Tonelaje", unidad: "Mt", min: 0.5, max: 8, step: 0.1, decimales: 1, nota: "variable fija" },
  { key: "precio", etiqueta: "Precio del cobre", unidad: "US$/lb", min: 2, max: 7, step: 0.1, decimales: 1, nota: "incertidumbre ±13%" },
  { key: "costo", etiqueta: "Costo de planta", unidad: "US$/t", min: 15, max: 60, step: 1, decimales: 0, nota: "incertidumbre ±9%" },
];

function Slider({
  config,
  valor,
  onChange,
}: {
  config: ConfigSlider;
  valor: number;
  onChange: (v: number) => void;
}) {
  const id = `slider-${config.key}`;
  const fill = ((valor - config.min) / (config.max - config.min)) * 100;
  const mostrado = valor.toLocaleString("es-ES", {
    minimumFractionDigits: config.decimales,
    maximumFractionDigits: config.decimales,
  });

  return (
    <div className="control">
      <div className="control-cabecera">
        <label htmlFor={id}>{config.etiqueta}</label>
        <output htmlFor={id} className="control-valor">
          {mostrado} <span>{config.unidad}</span>
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={config.min}
        max={config.max}
        step={config.step}
        value={valor}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
        aria-valuetext={`${mostrado} ${config.unidad}`}
      />
      <div className="control-pie">
        <span>{config.min.toLocaleString("es-ES")}</span>
        <span className="control-nota">{config.nota}</span>
        <span>{config.max.toLocaleString("es-ES")}</span>
      </div>
    </div>
  );
}

export function Simulador() {
  const [params, setParams] = useState<SimParams>(INICIAL);
  const resultado = useMemo(() => simular(params), [params]);

  const set = (key: keyof SimParams, valor: number) =>
    setParams((prev) => ({ ...prev, [key]: valor }));

  return (
    <div className="consola" id="simulador">
      <div className="consola-cabecera">
        <div>
          <p className="consola-kicker">Consola en vivo</p>
          <h2 className="consola-titulo">Un proyecto, miles de futuros posibles</h2>
        </div>
        <div className="consola-acciones">
          <div className="iteraciones" role="group" aria-label="Número de escenarios simulados">
            <span className="iteraciones-label">Escenarios</span>
            <div className="iteraciones-opciones">
              {ITERACIONES.map((n) => (
                <button
                  key={n}
                  type="button"
                  className={params.iteraciones === n ? "activo" : ""}
                  aria-pressed={params.iteraciones === n}
                  onClick={() => set("iteraciones", n)}
                >
                  {n === 1000 ? "1.000" : n === 4000 ? "4.000" : "10.000"}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="reiniciar"
            onClick={() => setParams(INICIAL)}
            aria-label="Restablecer valores iniciales"
            title="Restablecer valores iniciales"
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="consola-cuerpo">
        <div className="controles">
          {SLIDERS.map((config) => (
            <Slider
              key={config.key}
              config={config}
              valor={params[config.key]}
              onChange={(v) => set(config.key, v)}
            />
          ))}
          <div className="constante">
            <span>Recuperación metalúrgica</span>
            <strong>88% ± 3%</strong>
          </div>
        </div>

        <div className="resultado">
          <div className="resultado-cabecera">
            <span className="resultado-titulo">Margen operativo por escenario</span>
            <span className="leyenda">
              <i className="punto oxide" /> pérdida
              <i className="punto verdigris" /> utilidad
            </span>
          </div>

          <Histogram resultado={resultado} />

          <div className="percentiles">
            <div>
              <span className="percentil-nombre"><i className="punto oxide" /> P10 · pesimista</span>
              <strong>{usdMillones(resultado.p10)}</strong>
            </div>
            <div>
              <span className="percentil-nombre"><i className="punto bone" /> P50 · mediana</span>
              <strong>{usdMillones(resultado.p50)}</strong>
            </div>
            <div>
              <span className="percentil-nombre"><i className="punto brass" /> P90 · optimista</span>
              <strong>{usdMillones(resultado.p90)}</strong>
            </div>
          </div>

          <div className="probabilidad">
            <div className="probabilidad-texto">
              <span>Probabilidad de margen positivo</span>
              <strong>{porcentaje(resultado.probPositivo)}</strong>
            </div>
            <div
              className="probabilidad-barra"
              role="meter"
              aria-label="Probabilidad de margen positivo"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(resultado.probPositivo * 100)}
            >
              <span style={{ width: `${resultado.probPositivo * 100}%` }} />
            </div>
            <p>
              Promedio de la muestra: {usdMillones(resultado.media)}. Mueve los controles para ver cómo cambia la forma de la incertidumbre.
            </p>
          </div>
        </div>
      </div>

      <p className="consola-nota">
        Modelo ilustrativo: ley, precio, recuperación y costo se muestrean con distribuciones normales; el tonelaje se mantiene fijo. No constituye un estudio técnico ni una recomendación de inversión.
      </p>
    </div>
  );
}
