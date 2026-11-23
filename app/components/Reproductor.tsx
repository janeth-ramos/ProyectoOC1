"use client";

import { Player } from "@remotion/player";
import { DeUnNumero } from "../../remotion-video/src/DeUnNumero";

/** Reproductor de Remotion incrustado en la ruta educativa. */
export function Reproductor() {
  return (
    <div className="reproductor">
      <div className="reproductor-cabecera">
        <span>Animación · De un número a una distribución</span>
        <span className="reproductor-duracion">8 s</span>
      </div>
      <Player
        component={DeUnNumero}
        durationInFrames={240}
        compositionWidth={1280}
        compositionHeight={720}
        fps={30}
        controls
        loop
        style={{ width: "100%" }}
        acknowledgeRemotionLicense
      />
      <p className="reproductor-nota">
        Creada con Remotion y reproducible dentro de esta página. Puedes pausarla, avanzar y verla en pantalla completa.
      </p>
    </div>
  );
}
