import React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

/**
 * Pieza animada: de una estimación puntual a una distribución.
 * Se usa tanto en Remotion Studio como en el <Player> de la página web.
 */

const VIOLETA = "#A855F7";
const VIOLETA_CLARO = "#D8B4FE";
const PLOMO = "#23232B";
const HUESO = "#EDE9F2";

const Contornos: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const deriva = interpolate(
    frame,
    [0, durationInFrames],
    ["0px 0px", "-26px 14px"],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: -80,
        opacity: 0.32,
        translate: deriva,
      }}
    >
      <svg width="1440" height="880" viewBox="0 0 1440 880" fill="none">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path
            key={i}
            d={`M -60 ${120 + i * 105} C 180 ${40 + i * 105}, 320 ${260 + i * 105}, 560 ${150 + i * 105} S 900 ${30 + i * 105}, 1120 ${170 + i * 105} S 1340 ${260 + i * 105}, 1500 ${130 + i * 105}`}
            stroke={i % 2 === 0 ? VIOLETA : VIOLETA_CLARO}
            strokeWidth={i % 3 === 0 ? 2 : 1}
            opacity={0.55 - i * 0.05}
          />
        ))}
      </svg>
    </div>
  );
};

type Burbuja = {
  x: number;
  y: number;
  destinoX: number;
  destinoY: number;
  radio: number;
  retardo: number;
};

const Burbujas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Partículas: generadas deliberadamente como plantilla, no editables una a una.
  const burbujas: Burbuja[] = Array.from({ length: 34 }, (_, i) => ({
    x: 90 + random(`x${i}`) * 1100,
    y: 90 + random(`y${i}`) * 540,
    destinoX: 190 + i * 26,
    destinoY: 540 - 90 - Math.sin(i * 0.55) * 55 - random(`h${i}`) * 90,
    radio: 5 + random(`r${i}`) * 9,
    retardo: Math.floor(random(`t${i}`) * 26),
  }));

  return (
    <>
      {burbujas.map((b, i) => {
        const t = Math.max(0, frame - b.retardo);
        const x = interpolate(t, [0, 2 * fps], [b.x, b.destinoX], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.3, 0.9, 0.2, 1),
        });
        const y = interpolate(t, [0, 2 * fps], [b.y, b.destinoY], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.4, 0, 0.2, 1),
        });
        const opacidad = interpolate(frame, [4 * fps, 5.2 * fps], [0.9, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: b.radio * 2,
              height: b.radio * 2,
              borderRadius: "50%",
              backgroundColor: i % 4 === 0 ? VIOLETA_CLARO : VIOLETA,
              opacity: opacidad,
              boxShadow: `0 0 ${b.radio * 3}px ${VIOLETA}`,
            }}
          />
        );
      })}
    </>
  );
};

const Barras: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        left: 150,
        top: 330,
        width: 980,
        height: 210,
        display: "flex",
        alignItems: "flex-end",
        gap: 8,
      }}
    >
      {Array.from({ length: 30 }, (_, i) => {
        const altura = 40 + Math.exp(-Math.pow((i - 15) / 7, 2)) * 150 + random(`bar${i}`) * 26;
        const escala = interpolate(
          frame,
          [1.6 * fps + i * 1.2, 2.5 * fps + i * 1.2],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.spring({ damping: 200 }),
            output: "perceptual-scale",
          },
        );
        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: altura,
              borderRadius: 3,
              background:
                i < 7
                  ? "linear-gradient(to top, #7A4A9E, #A855F7)"
                  : "linear-gradient(to top, #A855F7, #D8B4FE)",
              opacity: 0.9,
              transformOrigin: "bottom",
              scale: escala,
            }}
          />
        );
      })}
    </div>
  );
};

const LineaBase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ancho = interpolate(frame, [1.4 * fps, 2.2 * fps], [0, 980], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <div
      style={{
        position: "absolute",
        left: 150,
        top: 542,
        height: 2,
        width: ancho,
        background: `linear-gradient(90deg, ${VIOLETA}, ${VIOLETA_CLARO})`,
        opacity: 0.7,
      }}
    />
  );
};

export const DeUnNumero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: PLOMO, fontFamily: "Arial, sans-serif" }}>
      <Contornos />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 70% 30%, rgba(168,85,247,0.22), transparent 55%)`,
        }}
      />

      <Burbujas />
      <Barras />
      <LineaBase />

      <div
        style={{
          position: "absolute",
          left: 150,
          top: 96,
          width: 980,
          textAlign: "center",
        }}
      >
        <Interactive.Div
          name="Título inicial"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -4,
            color: HUESO,
            opacity: interpolate(frame, [0, 0.7 * fps, 1.2 * fps], [0, 1, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }) * interpolate(frame, [1.5 * fps, 2.1 * fps], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [0, 0.8 * fps], ["0px 30px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          Un solo número
        </Interactive.Div>

        <Interactive.Div
          name="Título principal"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 92,
            fontWeight: 700,
            letterSpacing: -4,
            color: VIOLETA_CLARO,
            opacity: interpolate(frame, [1.8 * fps, 2.6 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            scale: interpolate(frame, [1.8 * fps, 2.6 * fps], [0.88, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.spring({ damping: 200 }),
              output: "perceptual-scale",
            }),
          }}
        >
          Miles de futuros
        </Interactive.Div>

        <Interactive.Div
          name="Percentiles"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 46,
            fontWeight: 600,
            letterSpacing: 2,
            color: HUESO,
            marginTop: 18,
            opacity: interpolate(frame, [4.6 * fps, 5.4 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(frame, [4.6 * fps, 5.4 * fps], ["0px 24px", "0px 0px"], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            }),
          }}
        >
          P10 · P50 · P90
        </Interactive.Div>

        <Interactive.Div
          name="Cierre"
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 34,
            fontWeight: 400,
            color: VIOLETA_CLARO,
            marginTop: 16,
            opacity: interpolate(
              frame,
              [6 * fps, 6.7 * fps, durationInFrames - 12, durationInFrames],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
          }}
        >
          La decisión cambia cuando ves la distribución
        </Interactive.Div>
      </div>
    </AbsoluteFill>
  );
};
