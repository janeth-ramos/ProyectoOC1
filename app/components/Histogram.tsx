import type { SimResult } from "../lib/montecarlo";

const W = 640;
const H = 262;
const LEFT = 10;
const RIGHT = 630;
const TOP = 42;
const BOTTOM = 216;
const PW = RIGHT - LEFT;
const PH = BOTTOM - TOP;

function corto(v: number) {
  const signo = v < 0 ? "−" : "";
  const a = Math.abs(v);
  const txt = a >= 1000 ? `${(a / 1000).toFixed(1)} mil` : new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(a);
  return `${signo}${txt}`;
}

export function Histogram({ resultado }: { resultado: SimResult }) {
  const { bins, min, max, p10, p50, p90, valores } = resultado;
  const n = valores.length;
  const maxCount = Math.max(1, ...bins.map((b) => b.count));
  const x = (valor: number) => LEFT + ((valor - min) / (max - min || 1)) * PW;
  const y = (count: number) => BOTTOM - (count / maxCount) * PH;
  const anchoBarra = PW / bins.length;
  const hayCero = min < 0 && max > 0;

  const marcadores = [
    { valor: p10, nombre: "P10", color: "var(--oxide)", pos: 0 },
    { valor: p50, nombre: "P50", color: "var(--bone)", pos: 1 },
    { valor: p90, nombre: "P90", color: "var(--brass)", pos: 2 },
  ];

  return (
    <svg
      className="histograma"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Distribución de ${new Intl.NumberFormat("es-ES").format(n)} escenarios de margen. P10 ${corto(p10)} millones de dólares, mediana ${corto(p50)} millones, P90 ${corto(p90)} millones.`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="barraPositiva" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--verdigris)" />
          <stop offset="100%" stopColor="var(--brass)" />
        </linearGradient>
      </defs>

      {/* rejilla horizontal */}
      {[0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={LEFT}
          x2={RIGHT}
          y1={BOTTOM - f * PH}
          y2={BOTTOM - f * PH}
          stroke="var(--line)"
          strokeWidth="1"
        />
      ))}

      {/* barras */}
      {bins.map((b, i) => {
        const altura = BOTTOM - y(b.count);
        const centro = (b.x0 + b.x1) / 2;
        const negativo = centro < 0;
        return (
          <rect
            key={i}
            className="barra"
            x={LEFT + i * anchoBarra + 0.8}
            y={y(b.count)}
            width={Math.max(1, anchoBarra - 1.6)}
            height={altura}
            rx="1.5"
            fill={negativo ? "var(--oxide)" : "url(#barraPositiva)"}
            opacity={negativo ? 0.85 : 0.92}
            style={{ animationDelay: `${Math.min(i * 22, 620)}ms` }}
          />
        );
      })}

      {/* línea de equilibrio */}
      {hayCero && (
        <g>
          <line x1={x(0)} x2={x(0)} y1={TOP - 6} y2={BOTTOM} stroke="var(--oxide)" strokeWidth="1.6" strokeDasharray="3 3" />
          <text x={x(0) + 5} y={BOTTOM + 16} className="eje-texto" fill="var(--oxide)">
            equilibrio
          </text>
        </g>
      )}

      {/* percentiles */}
      {marcadores.map((m) => {
        const px = Math.min(RIGHT - 2, Math.max(LEFT + 2, x(m.valor)));
        return (
          <g key={m.nombre}>
            <line x1={px} x2={px} y1={TOP} y2={BOTTOM} stroke={m.color} strokeWidth="1.4" strokeDasharray="4 4" opacity="0.9" />
            <circle cx={px} cy={TOP - 8} r="2.6" fill={m.color} />
            <text
              x={px}
              y={14}
              className="marcador-texto"
              fill={m.color}
              textAnchor={m.pos === 0 ? "start" : m.pos === 2 ? "end" : "middle"}
            >
              {m.nombre}
            </text>
          </g>
        );
      })}

      {/* eje */}
      <line x1={LEFT} x2={RIGHT} y1={BOTTOM} y2={BOTTOM} stroke="var(--line)" strokeWidth="1" />
      <text x={LEFT} y={BOTTOM + 16} className="eje-texto">
        {corto(min)}
      </text>
      <text x={RIGHT} y={BOTTOM + 16} className="eje-texto" textAnchor="end">
        {corto(max)}
      </text>
      <text x={RIGHT} y={H - 6} className="eje-titulo" textAnchor="end">
        margen operativo · USD millones
      </text>
    </svg>
  );
}
