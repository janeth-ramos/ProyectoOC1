/** Curvas de nivel decorativas, usadas como textura de fondo. */
export function Contornos({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`contornos ${className}`}
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <path
          key={i}
          d={`M -80 ${90 + i * 100} C 160 ${10 + i * 100}, 340 ${250 + i * 100}, 580 ${130 + i * 100} S 940 ${20 + i * 100}, 1160 ${160 + i * 100} S 1380 ${260 + i * 100}, 1520 ${110 + i * 100}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={i % 3 === 0 ? 1.6 : 0.8}
          opacity={0.5 - i * 0.045}
        />
      ))}
    </svg>
  );
}
