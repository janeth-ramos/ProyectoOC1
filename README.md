# Monte Carlo en la minería

Plataforma educativa interactiva en español creada por **Janeth Ramos**. La portada es una ruta guiada de siete pasos que empieza en la historia del método y termina en una aplicación minera con simulador en vivo.

## Qué incluye

- **Ruta educativa guiada**: historia, probabilidad sin miedo, distribuciones, método, fórmulas, aplicación en minería y síntesis. Avanza con los botones, el índice lateral o las flechas `←`/`→`.
- **Experimentos interactivos**: lanzamiento de monedas para ver la ley de los grandes números, selector de distribuciones y animación de burbujas/textos al cambiar de paso.
- **Player de Remotion**: pieza animada “De un número a una distribución”, reproducible dentro de la web con controles y pantalla completa.
- **Simulador en vivo**: ajusta ley, tonelaje, precio y costo; el histograma y los percentiles P10/P50/P90 se recalculan al instante.
- **Bibliografía verificada**: 11 referencias históricas, metodológicas y mineras con enlaces a repositorios institucionales o editoriales.
- **Asistente de IA** con AI SDK y Vercel AI Gateway.

> Todos los números del simulador son ilustrativos. No constituyen un estudio técnico ni una recomendación de inversión.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:3000. La ruta y el simulador funcionan sin credenciales. Para el chat, crea un archivo `.env.local` a partir de `.env.example` y añade tu `AI_GATEWAY_API_KEY`.

```bash
cp .env.example .env.local
```

### Remotion Studio

La composición se comparte entre Studio y el Player web. Ejecuta Studio desde la raíz del proyecto para usar una sola copia de React y Remotion:

```bash
npm run remotion:studio
```

Esto abre la vista previa de Remotion Studio. La animación usa `useCurrentFrame()`, `interpolate()` y elementos `Interactive`, según las prácticas de `remotion-best-practices`. No se genera ningún MP4 salvo que se solicite explícitamente.

## Despliegue en Vercel

1. Sube el proyecto a un repositorio de GitHub, GitLab o Bitbucket.
2. En Vercel, elige **Add New → Project** e importa el repositorio. El framework se detecta como Next.js; no hace falta cambiar ajustes de build.
3. En **Project Settings → AI Gateway**, activa la integración. Con eso, Vercel inyecta la autenticación OIDC y **no necesitas copiar ninguna clave API** en las variables de entorno.
4. Opcionalmente añade `AI_GATEWAY_MODEL` si quieres usar otro modelo. Por defecto se usa `google/gemini-2.5-flash`.
5. Haz clic en **Deploy**. Cada push a la rama principal generará un despliegue automático.

Si prefieres usar una clave en lugar de OIDC, añade `AI_GATEWAY_API_KEY` en **Project Settings → Environment Variables** para Production, Preview y Development. Nunca subas esa clave al repositorio.

### Notas sobre costos

El asistente consume tokens del modelo configurado a través de AI Gateway. Revisa los límites y tarifas en el panel de Vercel. La ruta y el simulador se ejecutan en el navegador y no generan costos de modelo.

## Estructura

```
app/
  api/chat/route.ts              Endpoint del chat (AI SDK + AI Gateway)
  components/
    ChatIA.tsx                   Interfaz del asistente
    Contornos.tsx                Curvas de nivel decorativas
    DemoMonedas.tsx              Experimento de probabilidad
    Glyph.tsx                    Glifos SVG
    Histogram.tsx                Gráfico del histograma
    Reproductor.tsx              Player de Remotion incrustado
    RutaEducativa.tsx            Ruta guiada de siete pasos
    SelectorDistribuciones.tsx   Pestañas de distribuciones
    Simulador.tsx                Consola interactiva
  lib/
    contenido.ts                 Historia, formulas y bibliografia
    montecarlo.ts                Motor de simulación determinista
  globals.css                    Sistema visual violeta eléctrico + plomo
  layout.tsx                     Metadatos y fuentes
  page.tsx                       Página principal
remotion-video/
  src/DeUnNumero.tsx             Composición animada compartida
  src/Root.tsx                   Registro de la composición
  src/index.ts                   Punto de entrada de Remotion Studio
remotion.config.ts               Configuración de Remotion en la raíz
```

## Comandos

```bash
npm run dev             # servidor de desarrollo
npm run build           # compilación de producción
npm run start           # servir la compilación
npm run lint            # ESLint
npm run remotion:studio # vista previa de la animación
```
