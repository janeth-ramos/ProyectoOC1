type GlyphName =
  | "capas"
  | "dado"
  | "calculo"
  | "distribucion"
  | "montana"
  | "balanza"
  | "escudo"
  | "reloj"
  | "brujula"
  | "chispa"
  | "flecha";

export function Glyph({ name, size = 24 }: { name: GlyphName; size?: number }) {
  const paths: Record<GlyphName, React.ReactNode> = {
    capas: (
      <>
        <path d="M12 3 3 8l9 5 9-5-9-5Z" />
        <path d="m3 13 9 5 9-5" />
        <path d="m3 18 9 5 9-5" />
      </>
    ),
    dado: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="8.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" />
        <circle cx="15.5" cy="15.5" r="1.1" fill="currentColor" stroke="none" />
      </>
    ),
    calculo: (
      <>
        <rect x="4" y="2.5" width="16" height="19" rx="2.5" />
        <path d="M8 7h8" />
        <path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16.5h.01M12 16.5h.01M15.5 16.5h.01" />
      </>
    ),
    distribucion: (
      <>
        <path d="M3 20h18" />
        <path d="M4 20c2.2 0 2.2-8 4.5-8s2.3 8 4.5 8 2.2-12 4.5-12S19.8 20 21 20" />
      </>
    ),
    montana: (
      <>
        <path d="m2 20 7.5-13 4 6.5 2.2-3.5L22 20H2Z" />
        <path d="m7.5 10.5 2 3.5M14 11l2 3" />
      </>
    ),
    balanza: (
      <>
        <path d="M12 3v18M7 21h10M4 7h16" />
        <path d="M6 7 3.5 13h5L6 7ZM18 7l-2.5 6h5L18 7Z" />
      </>
    ),
    escudo: (
      <>
        <path d="M12 2.5 20 6v6c0 5-3.4 8.2-8 9.5C7.4 20.2 4 17 4 12V6l8-3.5Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    reloj: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5.5l3.5 2" />
      </>
    ),
    brujula: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
      </>
    ),
    chispa: (
      <>
        <path d="M12 2.5 14 9l6.5 2-6.5 2-2 6.5L10 13l-6.5-2L10 9l2-6.5Z" />
        <path d="M19 3v3M17.5 4.5h3" />
      </>
    ),
    flecha: (
      <>
        <path d="M4 12h15" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
