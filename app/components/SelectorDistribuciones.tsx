"use client";

import { useState } from "react";
import { DISTRIBUCIONES } from "../lib/contenido";

export function SelectorDistribuciones() {
  const [activa, setActiva] = useState(DISTRIBUCIONES[1].id);
  const dist = DISTRIBUCIONES.find((d) => d.id === activa) ?? DISTRIBUCIONES[0];

  return (
    <div className="selector-dist">
      <div className="dist-pestañas" role="tablist" aria-label="Tipos de distribución">
        {DISTRIBUCIONES.map((d) => (
          <button
            key={d.id}
            type="button"
            role="tab"
            id={`tab-${d.id}`}
            aria-selected={d.id === activa}
            aria-controls="panel-dist"
            className={d.id === activa ? "activa" : ""}
            onClick={() => setActiva(d.id)}
          >
            {d.nombre}
          </button>
        ))}
      </div>

      <div className="dist-cuerpo" role="tabpanel" id="panel-dist" aria-labelledby={`tab-${activa}`}>
        <div className="dist-grafico" key={dist.id}>
          <svg viewBox="0 0 320 150" role="img" aria-label={`Forma de la distribución ${dist.nombre}`}>
            <defs>
              <linearGradient id={`relleno-${dist.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--violeta-claro)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="var(--violeta)" stopOpacity="0.04" />
              </linearGradient>
            </defs>
            <line x1="20" x2="300" y1="130" y2="130" stroke="var(--line-fuerte)" />
            <path d={dist.area} fill={`url(#relleno-${dist.id})`} />
            <path d={dist.curva} fill="none" stroke="var(--violeta-claro)" strokeWidth="3" strokeLinecap="round" />
            <line x1="160" x2="160" y1="22" y2="130" stroke="var(--brillo)" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
        </div>
        <div className="dist-texto">
          <h4>{dist.nombre}</h4>
          <p className="dist-frase">{dist.frase}</p>
          <p>{dist.explicacion}</p>
          <div className="dist-ejemplo"><span>En minería</span>{dist.ejemplo}</div>
        </div>
      </div>
    </div>
  );
}
