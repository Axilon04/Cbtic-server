import React, { useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Stage, BakeShadows } from '@react-three/drei';
import { ArrowRed } from '@interactions/models/arrowRed';
import { ArrowBlack } from '@interactions/models/arrowBlack';
import { useEffect } from 'react';
import THREE from 'three';

interface Element {
  refY: React.MutableRefObject<any>;
  refZ: React.MutableRefObject<any>;
  position: [number, number, number];
  rotation: [number, number, number];
}

const Onda = () => {
  const bolas = 100;
  const ElementsRef = useRef<Element[]>(
    Array.from({ length: bolas }, (_, i) => ({
      refY: useRef(),
      refZ: useRef(),
      position: [i * 5, -8, 0],
      rotation: [(110 * Math.PI) / 180, 0, 0],
    }))
  );
  const times = Array.from({ length: bolas }, () => 0);
  let time = 0;
  const phase = 4;

  useEffect(() => {
    const w = (2 * Math.PI) / 6;
    const Intervalo = setInterval(() => {
      if (time > 1) {
        for (let i = 0; i < ElementsRef.current.length; i++) {
          if (time > 1 + i * 0.2) {
            ElementsRef.current[i].refY.current.scale.y =
              20 * Math.sin(w * times[i] + phase);
            ElementsRef.current[i].refZ.current.scale.y =
              20 * Math.sin(w * times[i] + phase);
            times[i] += 1 / 60;
          }
        }
      }
      time += 1 / 60;
    }, 1000 / 60);

    return () => {
      clearInterval(Intervalo);
    };
  }, []);

  return (
    <group>
      {ElementsRef.current.map((element, index) => (
        <group key={index}>
          <ArrowRed
            position={element.position}
            movimiento={element.refY}
          />
          <ArrowBlack
            position={element.position}
            rotation={element.rotation}
            movimiento={element.refZ}
          />
        </group>
      ))}
    </group>
  );
};
export default function OndaMagnetica() {
  return (
    <div className="flex w-full h-full">
      <Canvas dpr={[1, 2]} className="w-full h-full">
        <Stage environment={'night'} intensity={0.9}>
          <Onda />
        </Stage>
        <OrbitControls />
        <BakeShadows></BakeShadows>
      </Canvas>
    </div>
  );
}
