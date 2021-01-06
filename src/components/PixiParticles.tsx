import { Emitter } from 'pixi-particles';
import { PixiDisplayObject, AnimationContext, ShapeTextureContext, TextureContext, useElement } from 'pixi-reactive';
import React, { useReducer, useContext, useState, useEffect, Reducer } from 'react';
import * as PIXI from 'pixi.js';
import { PixiParticlesProps } from '../props';

const PixiParticles: React.FC<PixiParticlesProps> = (props) => {
  const element = useElement(new PIXI.Container());
  const shapeContext = useContext(ShapeTextureContext);
  const { textures: textureContext } = useContext(TextureContext);
  const { frameId, elapsed } = useContext(AnimationContext);
  const [loadedTextures, setTexture] = useReducer((textures: PIXI.Texture[], texture: PIXI.Texture) => [...textures, texture], []);
  const [textureList, setTextureList] = useState<PIXI.Texture[]>([]);
  const [emitter, setEmitter] = useReducer<Reducer<Emitter | undefined, Emitter>>(
    (previousEmitter: Emitter | undefined, newEmitter: Emitter) => {
      if (previousEmitter) {
        previousEmitter.destroy();
      }
      return newEmitter;
    },
    undefined
  );
  const { textures, config, emit = true } = props;

  useEffect(() => {
    const textureIds = textures?.split(/\s+/) || [];
    const texturesFromContext = textureIds
      .map((id) => textureContext[id])
      .filter((texture) => texture instanceof PIXI.Texture) as PIXI.Texture[];

    setTextureList([...loadedTextures, ...texturesFromContext]);
  }, [textures, loadedTextures, textureContext]);

  useEffect(() => {
    setEmitter(new Emitter(element, textureList, config));
  }, [element, textureList, config]);

  useEffect(() => {
    if (emitter) {
      emitter.emit = emit;
    }
  }, [emitter, emit]);

  useEffect(() => {
    if (emitter) {
      emitter.update(elapsed * 0.001);
    }
  }, [emitter, frameId, elapsed]);

  return (
    <ShapeTextureContext.Provider value={{ ...shapeContext, setTexture }}>
      <PixiDisplayObject item={element} {...props} />
    </ShapeTextureContext.Provider>
  );
};

export default PixiParticles;
