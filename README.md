# pixi-reactive-particles

> Integrate support for Particle Effects into the pixi-reactive library.
> You can find more details on the [online documentation](https://mcastiello.github.io/pixi-reactive/#/index/components/pixiparticles/)

[![NPM](https://img.shields.io/npm/v/pixi-reactive-particles.svg)](https://www.npmjs.com/package/pixi-reactive-particles) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install pixi-reactive-particles
```
or
```bash
yarn add pixi-reactive-particles
```

## Usage

```tsx
import React, { useReducer } from 'react';
import { PixiCanvas, PixiTilingSprite, PixiSprite } from 'pixi-reactive';
import { PixiParticles } from 'pixi-reactive-particles';
import ThrusterConfig from './thruster.json';

const textures = {
  galaxy: './static/assets/galaxy.png',
  stars: './static/assets/slow-stars.png',
  sheet: './static/assets/spritesheet.json'
};

export const PixiParticlesExample: React.FC = () => {
  const [galaxyPosition, updateGalaxyPosition] = useReducer((position) => position - 1, 0);

  return (
    <PixiCanvas height={300} textures={textures} onUpdate={updateGalaxyPosition}>
      <PixiTilingSprite texture={'galaxy'} tileX={galaxyPosition} />
      <PixiSprite texture={'spaceship'} x={100} alignY={0.5}>
        <PixiParticles textures={'particle fire'} config={ThrusterConfig} />
      </PixiSprite>
    </PixiCanvas>
  );
};
```

## License

MIT © [mcastiello](https://github.com/mcastiello)
