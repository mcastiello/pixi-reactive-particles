import { Emitter } from 'pixi-particles';
import {
  PixiDisplayObject,
  AnimationContext,
  ShapeTextureContext,
  TextureContext,
  useElement,
  usePropsContext,
  PropsContext,
  RenderingContext
} from 'pixi-reactive';
import React, { useReducer, useContext, useState, useEffect, Reducer } from 'react';
import * as PIXI from 'pixi.js';
import { PixiParticlesProps } from '../props';
import { PixiParticlesBasicProps } from '../props/PixiParticlesProps';

const PixiParticles: React.FC<PixiParticlesProps> = ({ children, config, ...props }) => {
  const propsContext = usePropsContext<PixiParticlesBasicProps>(props);
  const { properties } = propsContext;
  const element = useElement(new PIXI.Container());
  const shapeContext = useContext(ShapeTextureContext);
  const { textures: textureContext } = useContext(TextureContext);
  const { frameId, elapsed } = useContext(AnimationContext);
  const { update } = useContext(RenderingContext);
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
  const { textures, emit = true } = properties;

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
      update();
    }
  }, [emitter, frameId, elapsed, update]);

  return (
    <PropsContext.Provider value={propsContext}>
      <ShapeTextureContext.Provider value={{ ...shapeContext, setTexture }}>
        <PixiDisplayObject item={element} {...properties} />
      </ShapeTextureContext.Provider>
    </PropsContext.Provider>
  );
};

export default PixiParticles;
