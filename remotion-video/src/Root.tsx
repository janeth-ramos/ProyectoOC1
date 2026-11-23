import { Composition } from "remotion";
import { DeUnNumero } from "./DeUnNumero";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DeUnNumero"
      component={DeUnNumero}
      durationInFrames={240}
      fps={30}
      width={1280}
      height={720}
      defaultProps={{}}
    />
  );
};
