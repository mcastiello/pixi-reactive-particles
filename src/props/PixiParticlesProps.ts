import { EmitterConfig } from 'pixi-particles';
import { PixiContainerProps } from 'pixi-reactive';

export type PixiParticlesBasicProps = PixiContainerProps & {
  textures?: string;
  emit?: boolean;
}

export type PixiParticlesProps = PixiParticlesBasicProps & {
  config: EmitterConfig;
};
