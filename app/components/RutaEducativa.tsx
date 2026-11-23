"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Contornos } from "./Contornos";
import { DemoMonedas } from "./DemoMonedas";
import { Glyph } from "./Glyph";
import { Reproductor } from "./Reproductor";
import { SelectorDistribuciones } from "./SelectorDistribuciones";
import { Simulador } from "./Simulador";
import { FORMULAS } from "../lib/contenido";

const PASOS = [
  { num: "01", titulo: "El origen", etiqueta: "Historia" },
  { num: "02", titulo: "Probabilidad sin miedo", etiqueta: "Conceptos" },
  { num: "03", titulo: "Tipos de distribución", etiqueta: "Formas" },
  { num: "04", titulo: "Cómo funciona", etiqueta: "Método" },
  { num: "05", titulo: "Las fórmulas", etiqueta: "Lenguaje" },
  { num: "06", titulo: "Aplicación en minería", etiqueta: "Práctica" },
  { num: "07", titulo: "Lo que te llevas", etiqueta: "Síntesis" },
];

const HISTORIA = [
  {
    ano: "1946",
    titulo: "Un solitario en Los Alamos",
    texto: "Stanislaw Ulam se recupera de una enfermedad jugando solitario y se pregunta cuántas veces ganaría. Las matemáticas clásicas no daban una respuesta fácil.",
  },
  {
    ano: "1947",
    titulo: "La idea de von Neumann",
    texto: "John von Neumann entiende que el muestreo aleatorio puede resolver problemas físicos demasiado complejos para resolverse de forma analítica.",
  },
  {
    ano: "1949",
    titulo: "Nace el nombre",
    texto: "Metropolis y Ulam publican el artículo fundacional. Metropolis propone el nombre en honor al casino de Montecarlo: azar, ruleta y probabilidad.",
  },
];

const METODO = [
  { glyph: "capas" as const, titulo: "Modelar", texto: "Convertir lo desconocido en distribuciones." },
  { glyph: "dado" as const, titulo: "Muestrear", texto: "Generar miles de escenarios aleatorios." },
  { glyph: "calculo" as const, titulo: "Calcular", texto: "Evaluar un indicador en cada escenario." },
  { glyph: "distribucion" as const, titulo: "Interpretar", texto: "Leer percentiles, no un único número." },
];

export function RutaEducativa() {
  const [paso, setPaso] = useState(0);
  const seccionRef = useRef<HTMLElement>(null);

  const irA = useCallback((n: number) => {
    const destino = Math.min(PASOS.length - 1, Math.max(0, n));
    setPaso(destino);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#paso-${destino + 1}`);
      seccionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const sincronizar = () => {
      const coincidencia = window.location.hash.match(/^#paso-(\d+)$/);
      if (!coincidencia) return;
      const n = Number(coincidencia[1]);
      if (n >= 1 && n <= PASOS.length) setPaso(n - 1);
    };
    sincronizar();
    window.addEventListener("hashchange", sincronizar);
    return () => window.removeEventListener("hashchange", sincronizar);
  }, []);

  useEffect(() => {
    const alTeclear = (e: KeyboardEvent) => {
      const objetivo = e.target as HTMLElement | null;
      if (!objetivo || objetivo.isContentEditable) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(objetivo.tagName)) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        irA(paso + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        irA(paso - 1);
      }
    };
    window.addEventListener("keydown", alTeclear);
    return () => window.removeEventListener("keydown", alTeclear);
  }, [paso, irA]);

  const burbujas = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        tamano: 7 + (i % 5) * 7,
        izquierda: `${(i * 31 + paso * 13) % 94}%`,
        arriba: `${10 + ((i * 23 + paso * 19) % 76)}%`,
        retardo: `${(i % 8) * 90}ms`,
        opacidad: 0.1 + (i % 4) * 0.055,
      })),
    [paso],
  );

  return (
    <section className="ruta" id="ruta" ref={seccionRef} aria-label="Ruta educativa interactiva">
      <Contornos className="ruta-contornos" />

      <div className="contenedor">
        <div className="ruta-cabecera">
          <div>
            <p className="eyebrow">Ruta interactiva · 7 pasos</p>
            <h2>Aprende Monte Carlo avanzando</h2>
          </div>
          <p className="ruta-ayuda">Pulsa <kbd>→</kbd> y <kbd>←</kbd> o elige un paso en el índice.</p>
        </div>

        <div className="ruta-progreso" role="progressbar" aria-label="Avance en la ruta" aria-valuemin={1} aria-valuemax={PASOS.length} aria-valuenow={paso + 1}>
          <span style={{ width: `${((paso + 1) / PASOS.length) * 100}%` }} />
        </div>

        <div className="ruta-layout">
          <nav className="ruta-indice" aria-label="Pasos de la ruta">
            {PASOS.map((p, i) => (
              <button
                key={p.num}
                type="button"
                className={`indice-paso ${i === paso ? "actual" : ""} ${i < paso ? "hecho" : ""}`}
                aria-current={i === paso ? "step" : undefined}
                onClick={() => irA(i)}
              >
                <span className="indice-num">{i < paso ? "✓" : p.num}</span>
                <span className="indice-texto">
                  <strong>{p.titulo}</strong>
                  <small>{p.etiqueta}</small>
                </span>
              </button>
            ))}
          </nav>

          <div className="ruta-escenario">
            <div className="burbujas" aria-hidden="true">
              {burbujas.map((b, i) => (
                <i
                  key={i}
                  style={{
                    width: b.tamano,
                    height: b.tamano,
                    left: b.izquierda,
                    top: b.arriba,
                    opacity: b.opacidad,
                    transitionDelay: b.retardo,
                  }}
                />
              ))}
            </div>

            <div className="paso-contenido" key={paso}>
              <div className="paso-cabecera">
                <span className="paso-sello">{PASOS[paso].etiqueta}</span>
                <span className="paso-contador">{String(paso + 1).padStart(2, "0")} / {String(PASOS.length).padStart(2, "0")}</span>
              </div>

              {paso === 0 && (
                <div className="paso-cuerpo">
                  <h3>Todo empezó con una pregunta sin respuesta fácil</h3>
                  <p>
                    A mediados del siglo XX, los científicos de Los Alamos necesitaban resolver problemas con demasiadas variables inciertas. El azar, que parecía un obstáculo, se convirtió en la herramienta.
                  </p>
                  <div className="linea-tiempo">
                    {HISTORIA.map((h) => (
                      <article key={h.ano}>
                        <span>{h.ano}</span>
                        <h4>{h.titulo}</h4>
                        <p>{h.texto}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {paso === 1 && (
                <div className="paso-cuerpo">
                  <h3>La probabilidad es solo frecuencia a largo plazo</h3>
                  <p>
                    Una moneda es imposible de predecir en un lanzamiento. Pero lanza cien veces y aparece un patrón: cerca de la mitad son caras. Monte Carlo explota precisamente esa regularidad del azar repetido.
                  </p>
                  <DemoMonedas />
                </div>
              )}

              {paso === 2 && (
                <div className="paso-cuerpo">
                  <h3>Cada variable tiene su propia forma de incertidumbre</h3>
                  <p>
                    Antes de simular hay que decidir cómo se comporta cada entrada. Elegir bien la distribución es la parte más importante —y la más discutida— del análisis.
                  </p>
                  <SelectorDistribuciones />
                </div>
              )}

              {paso === 3 && (
                <div className="paso-cuerpo">
                  <h3>Repetir, repetir y repetir</h3>
                  <p>
                    El método es sorprendentemente simple: modelar, muestrear, calcular e interpretar. La potencia no está en la complejidad, sino en repetir miles de veces.
                  </p>
                  <div className="metodo-mini">
                    {METODO.map((m, i) => (
                      <div key={m.titulo}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        <Glyph name={m.glyph} size={22} />
                        <strong>{m.titulo}</strong>
                        <small>{m.texto}</small>
                      </div>
                    ))}
                  </div>
                  <Reproductor />
                </div>
              )}

              {paso === 4 && (
                <div className="paso-cuerpo">
                  <h3>Las fórmulas detrás de la intuición</h3>
                  <p>
                    No hace falta memorizarlas, pero sí saber qué dicen. Estas siete expresiones resumen casi todo lo que ocurre en una simulación de Monte Carlo.
                  </p>
                  <div className="formulas-grid">
                    {FORMULAS.map((f) => (
                      <article key={f.etiqueta}>
                        <span>{f.etiqueta}</span>
                        <strong>{f.expresion}</strong>
                        <p>{f.lectura}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {paso === 5 && (
                <div className="paso-cuerpo">
                  <h3>Ahora sí: una mina bajo incertidumbre</h3>
                  <p>
                    La ley, el precio, la recuperación y el costo no son números fijos. Mueve los controles y observa cómo cambia la distribución completa del margen operativo.
                  </p>
                  <Simulador />
                </div>
              )}

              {paso === 6 && (
                <div className="paso-cuerpo">
                  <h3>Lo que te llevas</h3>
                  <p>
                    Monte Carlo no elimina la incertidumbre: la hace visible. Y una decisión con el riesgo a la vista siempre es mejor que una decisión basada en un promedio engañoso.
                  </p>
                  <div className="sintesis">
                    <div><Glyph name="capas" size={24} /><strong>Modela lo que no controlas</strong><p>Una distribución vale más que un supuesto oculto.</p></div>
                    <div><Glyph name="distribucion" size={24} /><strong>Lee el rango completo</strong><p>P10, P50 y P90 cuentan una historia que un promedio no puede.</p></div>
                    <div><Glyph name="chispa" size={24} /><strong>Sigue preguntando</strong><p>El asistente y la bibliografía están al final de la página.</p></div>
                  </div>
                </div>
              )}
            </div>

            <div className="ruta-nav">
              <button type="button" className="btn btn-ghost" onClick={() => irA(paso - 1)} disabled={paso === 0}>
                ← Anterior
              </button>
              {paso < PASOS.length - 1 ? (
                <button type="button" className="btn btn-primary" onClick={() => irA(paso + 1)}>
                  Siguiente
                  <Glyph name="flecha" size={17} />
                </button>
              ) : (
                <a className="btn btn-primary" href="#chat-ia">
                  Abrir asistente
                  <Glyph name="flecha" size={17} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
