export type Distribucion = {
  id: string;
  nombre: string;
  frase: string;
  explicacion: string;
  ejemplo: string;
  curva: string;
  area: string;
};

export const DISTRIBUCIONES: Distribucion[] = [
  {
    id: "uniforme",
    nombre: "Uniforme",
    frase: "Todos los valores son igual de probables.",
    explicacion:
      "Es la distribución más honesta cuando solo conoces un mínimo y un máximo. No favorece a ningún valor del rango.",
    ejemplo: "Un precio que solo sabes que estará entre 3 y 5 US$/lb.",
    curva: "M 20 130 L 20 30 L 300 30 L 300 130",
    area: "M 20 130 L 20 30 L 300 30 L 300 130 Z",
  },
  {
    id: "normal",
    nombre: "Normal",
    frase: "La campana: lo cercano a la media es lo más probable.",
    explicacion:
      "Dos parámetros lo definen todo: la media (dónde se concentra) y la desviación estándar (cuánto se dispersa).",
    ejemplo: "La ley de un mineral alrededor de un valor conocido por exploración.",
    curva: "M 20 130 C 90 130, 110 30, 160 30 C 210 30, 230 130, 300 130",
    area: "M 20 130 C 90 130, 110 30, 160 30 C 210 30, 230 130, 300 130 Z",
  },
  {
    id: "triangular",
    nombre: "Triangular",
    frase: "Mínimo, valor más probable y máximo.",
    explicacion:
      "Ideal cuando la información es escasa: defines tres puntos y la distribución hace el resto.",
    ejemplo: "Un costo de planta con un estimado base y dos extremos.",
    curva: "M 20 130 L 170 30 L 300 130",
    area: "M 20 130 L 170 30 L 300 130 Z",
  },
  {
    id: "lognormal",
    nombre: "Lognormal",
    frase: "De cola larga y siempre positiva.",
    explicacion:
      "Útil cuando el valor no puede ser negativo y existe una pequeña probabilidad de resultados muy altos.",
    ejemplo: "Precios futuros o tamaños potenciales de un depósito.",
    curva: "M 20 130 C 70 130, 120 118, 170 90 C 215 64, 255 32, 300 20",
    area: "M 20 130 C 70 130, 120 118, 170 90 C 215 64, 255 32, 300 20 L 300 130 Z",
  },
];

export type Formula = {
  etiqueta: string;
  expresion: string;
  lectura: string;
};

export const FORMULAS: Formula[] = [
  {
    etiqueta: "Valor esperado",
    expresion: "E[X] = Σ xᵢ · pᵢ",
    lectura: "El promedio ponderado de todos los resultados posibles.",
  },
  {
    etiqueta: "Varianza",
    expresion: "Var(X) = E[(X − μ)²]",
    lectura: "Mide qué tan dispersos están los resultados alrededor de la media.",
  },
  {
    etiqueta: "Estimador de Monte Carlo",
    expresion: "μ̂ = (1/N) · Σ f(xᵢ)",
    lectura: "La media de la muestra de N escenarios estima el valor verdadero.",
  },
  {
    etiqueta: "Error estándar",
    expresion: "SE = σ / √N",
    lectura: "Duplicar la precisión cuesta cuatro veces más escenarios.",
  },
  {
    etiqueta: "Percentil",
    expresion: "Pq = F⁻¹(q)",
    lectura: "El valor por debajo del cual cae la fracción q de los resultados.",
  },
  {
    etiqueta: "Margen minero",
    expresion: "M = T·L·R·2204,62·P − T·C",
    lectura: "Tonelaje × ley × recuperación × precio menos el costo de procesar.",
  },
  {
    etiqueta: "Valor presente neto",
    expresion: "VPN = Σ Fₜ/(1+r)ᵗ − I₀",
    lectura: "Trae cada flujo futuro al presente y resta la inversión inicial.",
  },
];

export type Referencia = {
  autores: string;
  ano: string;
  titulo: string;
  tipo: string;
  url: string;
  nota: string;
};

export const BIBLIOGRAFIA: Referencia[] = [
  {
    autores: "Metropolis, N. y Ulam, S.",
    ano: "1949",
    titulo: "The Monte Carlo Method",
    tipo: "Journal of the American Statistical Association 44(247), 335–341",
    url: "https://www.jstor.org/stable/2280232",
    nota: "Primera descripción publicada del método, desde Los Alamos.",
  },
  {
    autores: "Metropolis, N.",
    ano: "1987",
    titulo: "The Beginning of the Monte Carlo Method",
    tipo: "Los Alamos Science, Special Issue 15, 125–130",
    url: "https://permalink.lanl.gov/object/tr?what=info:lanl-repo/lareport/LA-UR-88-9067",
    nota: "Relato de primera mano y origen del nombre ligado al casino de Montecarlo.",
  },
  {
    autores: "Eckhardt, R.",
    ano: "1987",
    titulo: "Stan Ulam, John von Neumann, and the Monte Carlo Method",
    tipo: "Los Alamos Science, Special Issue 15, 131–141",
    url: "https://permalink.lanl.gov/object/tr?what=info:lanl-repo/lareport/LA-UR-88-9068",
    nota: "Documenta el solitario de Ulam en 1946 y la carta de von Neumann en 1947.",
  },
  {
    autores: "Metropolis, N., Rosenbluth, A. W., Rosenbluth, M. N., Teller, A. H. y Teller, E.",
    ano: "1953",
    titulo: "Equation of State Calculations by Fast Computing Machines",
    tipo: "The Journal of Chemical Physics 21(6), 1087–1092",
    url: "https://people.umass.edu/bvs/The_1953_paper.pdf",
    nota: "Artículo clásico que introduce el algoritmo de Metropolis.",
  },
  {
    autores: "Robert, C. P. y Casella, G.",
    ano: "2004",
    titulo: "Monte Carlo Statistical Methods",
    tipo: "Libro, Springer",
    url: "https://doi.org/10.1007/978-1-4757-4145-2",
    nota: "Referencia metodológica moderna sobre muestreo e integración.",
  },
  {
    autores: "Journel, A. G.",
    ano: "1974",
    titulo: "Geostatistics for Conditional Simulation of Ore Bodies",
    tipo: "Economic Geology 69(5), 673–687",
    url: "https://doi.org/10.2113/gsecongeo.69.5.673",
    nota: "Obra pionera en simulación condicional aplicada a yacimientos.",
  },
  {
    autores: "Journel, A. G.",
    ano: "1976",
    titulo: "Ore Grade Distributions and Conditional Simulations",
    tipo: "Capítulo en Advanced Geostatistics in the Mining Industry, 195–202",
    url: "https://link.springer.com/chapter/10.1007/978-94-010-1470-0_12",
    nota: "Compara distribuciones de ley y simulación condicional de reservas.",
  },
  {
    autores: "Journel, A. G. y Huijbregts, C. J.",
    ano: "1978",
    titulo: "Mining Geostatistics",
    tipo: "Libro, Academic Press",
    url: "https://www.osti.gov/etdeweb/biblio/5214736",
    nota: "Texto canónico de geoestadística minera y reservas recuperables.",
  },
  {
    autores: "Dimitrakopoulos, R., Farrelly, C. T. y Godoy, M.",
    ano: "2002",
    titulo: "Moving forward from traditional optimization: grade uncertainty and risk effects in open-pit design",
    tipo: "Mining Technology 111(1), 82–88",
    url: "https://www.cosmo.mcgill.ca/wp-content/uploads/2015/08/STRAT_%5b2002%5dDIM_FARRELLY_Moving_forward_from_traditional_optimisation.pdf",
    nota: "Muestra cómo la incertidumbre de ley cambia el diseño de minas a cielo abierto.",
  },
  {
    autores: "Ugwuegbu, C. C.",
    ano: "2013",
    titulo: "Segilola gold mine valuation using Monte Carlo simulation approach",
    tipo: "Mineral Economics 26(1–2), 39–46",
    url: "https://doi.org/10.1007/s13563-013-0030-8",
    nota: "Caso de valoración minera con flujo de caja descontado y Monte Carlo.",
  },
  {
    autores: "Lane, G. R., Terblanche, M., Meyer, G. y Sasto, N.",
    ano: "2013",
    titulo: "Case study on quantitative risk modelling to obtain a realistic risk-adjusted project valuation",
    tipo: "Journal of the Southern African Institute of Mining and Metallurgy 113(3), 181–190",
    url: "https://www.saimm.co.za/Journal/v113n03p181.pdf",
    nota: "Caso con 10.000 iteraciones, probabilidad de VPN negativo y VaR.",
  },
];
