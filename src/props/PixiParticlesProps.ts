import { EmitterConfig } from 'pixi-particles';
import { PixiContainerProps } from 'pixi-reactive';

export type PixiParticlesProps = PixiContainerProps & {
  config: EmitterConfig;
  textures?: string;
  emit?: boolean;
};
