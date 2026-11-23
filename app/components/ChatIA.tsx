"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { Glyph } from "./Glyph";

const SUGERENCIAS = [
  "¿Qué significa P10 en la práctica?",
  "¿Cómo elijo las distribuciones de entrada?",
  "¿Cuántas iteraciones necesito?",
  "¿Qué errores son comunes al modelar una mina?",
];

export function ChatIA() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, error, stop } = useChat();
  const listaRef = useRef<HTMLDivElement>(null);

  const ocupado = status === "submitted" || status === "streaming";

  useEffect(() => {
    // Desplazar solo el área de mensajes, nunca la página completa.
    const lista = listaRef.current;
    if (lista) lista.scrollTop = lista.scrollHeight;
  }, [messages, status]);

  function enviar(texto: string) {
    const limpio = texto.trim();
    if (!limpio || ocupado) return;
    sendMessage({ text: limpio });
    setInput("");
  }

  return (
    <div className="chat" id="chat-ia">
      <div className="chat-cabecera">
        <div className="chat-titulo">
          <span className="chat-icono"><Glyph name="chispa" size={20} /></span>
          <div>
            <p className="chat-kicker">Asistente</p>
            <h2>Pregunta lo que quieras sobre Monte Carlo y minería</h2>
          </div>
        </div>
        <span className="chat-estado"><i /> En línea</span>
      </div>

      <p className="chat-intro">
        Responde en español sobre el método, sus resultados y su aplicación a proyectos mineros. Úsalo para profundizar en cualquier sección de esta página.
      </p>

      {messages.length === 0 && (
        <div className="sugerencias">
          {SUGERENCIAS.map((s) => (
            <button key={s} type="button" onClick={() => enviar(s)} disabled={ocupado}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="chat-mensajes" ref={listaRef} aria-live="polite" aria-busy={ocupado}>
        {messages.map((m) => (
          <article key={m.id} className={`mensaje ${m.role === "user" ? "usuario" : "asistente"}`}>
            <span className="mensaje-autor">{m.role === "user" ? "Tú" : "Analista"}</span>
            {m.parts.map((part, i) =>
              part.type === "text" ? <p key={`${m.id}-${i}`}>{part.text}</p> : null,
            )}
          </article>
        ))}

        {status === "submitted" && (
          <article className="mensaje asistente">
            <span className="mensaje-autor">Analista</span>
            <p className="pensando"><i /><i /><i /></p>
          </article>
        )}

        {error && (
          <div className="chat-error" role="alert">
            <strong>El asistente no está disponible en este momento.</strong>
            <span>
              Puedes seguir usando la ruta, el simulador y la bibliografía. Si eres el administrador, revisa el estado de AI Gateway en Vercel.
            </span>
          </div>
        )}
      </div>

      <form
        className="chat-formulario"
        onSubmit={(e) => {
          e.preventDefault();
          enviar(input);
        }}
      >
        <label className="sr-only" htmlFor="chat-input">Escribe tu pregunta</label>
        <input
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          placeholder="Escribe tu pregunta…"
          autoComplete="off"
          disabled={ocupado}
        />
        {ocupado ? (
          <button type="button" className="chat-enviar detener" onClick={stop} aria-label="Detener respuesta">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" /></svg>
          </button>
        ) : (
          <button type="submit" className="chat-enviar" aria-label="Enviar pregunta" disabled={!input.trim()}>
            <Glyph name="flecha" size={19} />
          </button>
        )}
      </form>
      <p className="chat-aviso">Respuestas orientativas generadas por IA. Los ejemplos numéricos de esta página son ilustrativos.</p>
    </div>
  );
}
