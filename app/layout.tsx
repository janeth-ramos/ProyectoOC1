import type { Metadata } from "next";
import { Newsreader, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const lectura = Newsreader({
  variable: "--font-lectura",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Monte Carlo en la minería · Ruta interactiva por Janeth Ramos",
  description:
    "Ruta educativa interactiva de siete pasos sobre el análisis de Monte Carlo: historia, probabilidades, distribuciones, fórmulas y aplicación en minería, con simulador y asistente de IA.",
  authors: [{ name: "Janeth Ramos" }],
  keywords: ["Monte Carlo", "minería", "riesgo minero", "simulación", "P10 P50 P90", "valoración de proyectos", "educación"],
  openGraph: {
    title: "Monte Carlo en la minería",
    description: "Una página interactiva para entender el riesgo como distribución, no como un número.",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${display.variable} ${lectura.variable}`}>
      <body>{children}</body>
    </html>
  );
}
