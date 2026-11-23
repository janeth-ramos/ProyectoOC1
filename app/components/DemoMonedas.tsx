"use client";

import { useState } from "react";

export function DemoMonedas() {
  const [lanzamientos, setLanzamientos] = useState<boolean[]>([]);
  const caras = lanzamientos.filter(Boolean).length;
  const total = lanzamientos.length;
  const frecuencia = total === 0 ? 0 : caras / total;
  const desvio = Math.abs(frecuencia - 0.5);

  function lanzar(n: number) {
    setLanzamientos((prev) => {
      const nuevos = Array.from({ length: n }, () => Math.random() < 0.5);
      return [...prev, ...nuevos].slice(-2000);
    });
  }

  return (
    <div className="demo-monedas">
      <div className="demo-cabecera">
        <div>
          <span className="demo-etiqueta">Experimento</span>
          <strong>{total.toLocaleString("es-ES")} lanzamientos</strong>
        </div>
        <div className="demo-controles">
          <button type="button" onClick={() => lanzar(10)}>+10</button>
          <button type="button" onClick={() => lanzar(100)}>+100</button>
          <button type="button" className="demo-reiniciar" onClick={() => setLanzamientos([])}>Reiniciar</button>
        </div>
      </div>

      <div className="demo-barra" role="meter" aria-label="Frecuencia de caras" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(frecuencia * 100)}>
        <span style={{ width: `${frecuencia * 100}%` }} />
        <i />
      </div>
      <div className="demo-lectura">
        <span>Frecuencia de caras: <strong>{(frecuencia * 100).toFixed(1)}%</strong></span>
        <span>Teoría: 50%</span>
      </div>

      <div className="demo-muestra" aria-hidden="true">
        {lanzamientos.slice(-48).map((cara, i) => (
          <i key={i} className={cara ? "cara" : "cruz"} />
        ))}
        {total === 0 && <span className="demo-vacio">Pulsa +10 para empezar</span>}
      </div>

      <p className="demo-mensaje">
        {total === 0
          ? "Cada lanzamiento es imprevisible. El patrón aparece cuando repites muchos."
          : desvio < 0.03
            ? "Con suficientes repeticiones, la frecuencia se acerca al 50%: esto es la ley de los grandes números."
            : `Aún hay una desviación de ${(desvio * 100).toFixed(1)} puntos. Sigue lanzando para ver cómo se reduce.`}
      </p>
    </div>
  );
}
