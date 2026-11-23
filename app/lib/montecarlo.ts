/**
 * Motor de simulación de Monte Carlo para un proyecto minero ficticio.
 *
 * Todos los números son ILUSTRATIVOS: no representan ningún yacimiento,
 * estudio de factibilidad ni recomendación de inversión real.
 */

export type SimParams = {
  /** Ley de cobre, en % */
  ley: number;
  /** Tonelaje procesado, en millones de toneladas (Mt) */
  tonelaje: number;
  /** Precio del cobre, en USD/lb */
  precio: number;
  /** Costo de procesamiento, en USD por tonelada tratada */
  costo: number;
  /** Número de escenarios muestreados */
  iteraciones: number;
};

export type Bin = { x0: number; x1: number; count: number };

export type SimResult = {
  valores: number[];
  bins: Bin[];
  min: number;
  max: number;
  p10: number;
  p50: number;
  p90: number;
  media: number;
  probPositivo: number;
  precioEsperado: number;
  leyEsperada: number;
};

const LB_POR_TONELADA = 2204.62;
const RECUPERACION_BASE = 0.88;
const BINS = 34;

/** PRNG determinista: mismos parámetros => misma muestra. */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashParams(p: SimParams): number {
  const key = `${p.ley}|${p.tonelaje}|${p.precio}|${p.costo}|${p.iteraciones}`;
  let h = 2166136261;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Normal estándar por Box–Muller, recortada para evitar colas absurdas. */
function normal(rng: () => number, media: number, desviacion: number, lo: number, hi: number) {
  const u = Math.max(rng(), 1e-12);
  const v = Math.max(rng(), 1e-12);
  const z = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.min(hi, Math.max(lo, media + z * desviacion));
}

function percentil(ordenado: number[], q: number): number {
  if (ordenado.length === 0) return 0;
  const idx = q * (ordenado.length - 1);
  const i = Math.floor(idx);
  const f = idx - i;
  const a = ordenado[i];
  const b = ordenado[Math.min(i + 1, ordenado.length - 1)];
  return a + (b - a) * f;
}

export function simular(p: SimParams): SimResult {
  const rng = mulberry32(hashParams(p));
  const valores: number[] = new Array(p.iteraciones);
  let suma = 0;
  let positivos = 0;

  for (let i = 0; i < p.iteraciones; i++) {
    // Incertidumbre: ley, precio, recuperación y costo.
    const ley = normal(rng, p.ley, p.ley * 0.16, 0.01, 5);
    const precio = normal(rng, p.precio, p.precio * 0.13, 0.2, 20);
    const recuperacion = normal(rng, RECUPERACION_BASE, 0.03, 0.55, 0.98);
    const costo = normal(rng, p.costo, p.costo * 0.09, 1, 500);

    const toneladas = p.tonelaje * 1_000_000;
    const metalContenido = toneladas * (ley / 100);
    const metalProducido = metalContenido * recuperacion;
    const libras = metalProducido * LB_POR_TONELADA;
    const ingresos = libras * precio;
    const costos = toneladas * costo;
    const margen = (ingresos - costos) / 1_000_000; // USD millones

    valores[i] = margen;
    suma += margen;
    if (margen > 0) positivos++;
  }

  const ordenado = [...valores].sort((a, b) => a - b);
  const p10 = percentil(ordenado, 0.1);
  const p50 = percentil(ordenado, 0.5);
  const p90 = percentil(ordenado, 0.9);

  // Dominio visual recortado a P1–P99 para que las colas no aplasten el histograma.
  const lo = percentil(ordenado, 0.01);
  const hi = percentil(ordenado, 0.99);
  const min = Math.min(lo, p10 - (p90 - p10) * 0.25);
  const max = Math.max(hi, p10 + (p90 - p10) * 1.25);
  const ancho = (max - min) / BINS || 1;

  const counts = new Array(BINS).fill(0);
  for (const v of valores) {
    const idx = Math.min(BINS - 1, Math.max(0, Math.floor((v - min) / ancho)));
    counts[idx]++;
  }
  const bins: Bin[] = counts.map((count, i) => ({
    x0: min + i * ancho,
    x1: min + (i + 1) * ancho,
    count,
  }));

  return {
    valores,
    bins,
    min,
    max,
    p10,
    p50,
    p90,
    media: suma / p.iteraciones,
    probPositivo: positivos / p.iteraciones,
    precioEsperado: p.precio,
    leyEsperada: p.ley,
  };
}

export function usdMillones(v: number): string {
  const signo = v < 0 ? "−" : "";
  const abs = Math.abs(v);
  const digits = abs >= 100 ? 0 : 1;
  return `${signo}US$ ${new Intl.NumberFormat("es-ES", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(abs)}M`;
}

export function porcentaje(v: number): string {
  return `${new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(v * 100)}%`;
}
