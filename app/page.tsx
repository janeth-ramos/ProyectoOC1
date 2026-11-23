import { ChatIA } from "./components/ChatIA";
import { Contornos } from "./components/Contornos";
import { Glyph } from "./components/Glyph";
import { RutaEducativa } from "./components/RutaEducativa";
import { BIBLIOGRAFIA } from "./lib/contenido";

const CASOS = [
  {
    glyph: "balanza" as const,
    titulo: "Valoración de proyectos",
    texto: "Pasar de un único VPN a un rango de valores probables y justificar decisiones con una curva de confianza.",
    tag: "FLUJO DE CAJA",
    destacado: true,
  },
  {
    glyph: "montana" as const,
    titulo: "Planeación de mina",
    texto: "Evaluar secuencias de extracción frente a precios y leyes inciertos.",
    tag: "PLANIFICACIÓN",
    destacado: false,
  },
  {
    glyph: "escudo" as const,
    titulo: "Cobertura de precios",
    texto: "Cuantificar la exposición al precio antes de cubrirse.",
    tag: "RIESGO COMERCIAL",
    destacado: false,
  },
  {
    glyph: "brujula" as const,
    titulo: "Reservas y ley",
    texto: "Medir el efecto de la incertidumbre geológica en el recurso.",
    tag: "GEOLOGÍA",
    destacado: false,
  },
  {
    glyph: "reloj" as const,
    titulo: "Cierre de mina",
    texto: "Estimar pasivos ambientales y su variación en el tiempo.",
    tag: "CICLO DE VIDA",
    destacado: false,
  },
];

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="contenedor header-inner">
          <a className="marca" href="#inicio" aria-label="Monte Carlo en minería, inicio">
            <span className="marca-simbolo">MC</span>
            <span className="marca-texto">
              <strong>MONTE CARLO</strong>
              <span>una experiencia de Janeth Ramos</span>
            </span>
          </a>
          <nav className="nav" aria-label="Navegación principal">
            <a href="#ruta">Ruta interactiva</a>
            <a href="#casos">Aplicaciones</a>
            <a href="#chat-ia">Asistente</a>
            <a href="#bibliografia">Bibliografía</a>
          </nav>
          <a className="header-cta" href="#paso-1">
            <Glyph name="flecha" size={15} />
            <span>Empezar ruta</span>
          </a>
        </div>
      </header>

      <main id="inicio">
        <section className="hero">
          <Contornos className="hero-contornos" />
          <div className="contenedor hero-inner">
            <p className="eyebrow">Plataforma educativa interactiva</p>
            <h1>
              Aprende a decidir cuando <em>el futuro es incierto.</em>
            </h1>
            <p className="lede">
              Una ruta guiada de siete pasos: desde el solitario de Ulam en 1946 hasta una mina real bajo incertidumbre. Con animaciones, experimentos, fórmulas y un asistente que responde tus preguntas.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#paso-1">
                Comenzar la ruta
                <Glyph name="flecha" size={17} />
              </a>
              <a className="btn btn-ghost" href="#paso-6">Ir al simulador</a>
            </div>
            <p className="hero-firma">Diseñado y construido por <strong>Janeth Ramos</strong></p>
          </div>
        </section>

        <RutaEducativa />

        <section className="seccion" id="casos">
          <div className="contenedor">
            <div className="seccion-cabecera">
              <p className="eyebrow">Después de los conceptos</p>
              <h2>Donde la minería usa Monte Carlo</h2>
              <p>La incertidumbre está en cada etapa del proyecto. Estas son cinco aplicaciones donde la simulación aporta información que un promedio no puede dar.</p>
            </div>
            <div className="casos-grid">
              {CASOS.map((caso) => (
                <article className={caso.destacado ? "caso destacado" : "caso"} key={caso.titulo}>
                  <div className="caso-glyph"><Glyph name={caso.glyph} size={caso.destacado ? 34 : 26} /></div>
                  <div>
                    <h3>{caso.titulo}</h3>
                    <p>{caso.texto}</p>
                  </div>
                  <span className="caso-tag">{caso.tag}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="seccion chat-seccion" id="chat-ia">
          <div className="contenedor chat-layout">
            <div className="chat-lado">
              <p className="eyebrow">Asistente de IA</p>
              <h2>Sigue explorando con preguntas</h2>
              <p>¿Qué significa realmente P10? ¿Cuántas iteraciones bastan? ¿Cómo se modela la incertidumbre geológica? Escríbelo y el asistente te responde en español.</p>
              <ul>
                <li><span>01</span> Conceptos del método con ejemplos mineros.</li>
                <li><span>02</span> Interpretación de percentiles y curvas de riesgo.</li>
                <li><span>03</span> Buenas prácticas y errores frecuentes al modelar.</li>
              </ul>
            </div>
            <ChatIA />
          </div>
        </section>

        <section className="seccion bibliografia" id="bibliografia">
          <div className="contenedor">
            <div className="seccion-cabecera">
              <p className="eyebrow">Para profundizar</p>
              <h2>Bibliografía y fuentes</h2>
              <p>Referencias verificadas que sostienen el contenido histórico, metodológico y minero de esta ruta. Los enlaces proceden de repositorios institucionales, editoriales y publicaciones técnicas.</p>
            </div>
            <ol className="refs">
              {BIBLIOGRAFIA.map((ref) => (
                <li key={ref.url}>
                  <span>{ref.autores} ({ref.ano}).</span>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer">{ref.titulo}</a>
                  <small>{ref.tipo}</small>
                  <p>{ref.nota}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="contenedor footer-inner">
          <div>
            <div className="footer-marca">Monte Carlo en la minería</div>
            <p>
              Proyecto educativo de <strong>Janeth Ramos</strong>. Todos los valores del simulador son ilustrativos y no representan yacimientos, estudios de factibilidad ni recomendaciones de inversión.
            </p>
          </div>
          <div className="footer-enlaces">
            <a href="#ruta">Ruta</a>
            <a href="#casos">Aplicaciones</a>
            <a href="#bibliografia">Fuentes</a>
          </div>
        </div>
      </footer>
    </>
  );
}
