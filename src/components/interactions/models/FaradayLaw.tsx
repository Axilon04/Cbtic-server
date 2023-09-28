"use client"
/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 faraday.glb -t s w -p 3 --output FaradayLaw.tsx 
*/

import * as THREE from 'three';
import React, { useCallback, useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import useFaradayLaw from '@store/faradaylaw';

type GLTFResult = GLTF & {
  nodes: {
    Text: THREE.Mesh;
    Text001: THREE.Mesh;
    NurbsCurve: THREE.Mesh;
    Cube: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cylinder: THREE.Mesh;
    Cylinder001: THREE.Mesh;
    NurbsCurve002: THREE.Mesh;
    Cube001_1: THREE.Mesh;
    Cube001_2: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube004: THREE.Mesh;
    Cube005: THREE.Mesh;
    Cube006: THREE.Mesh;
    Cube007: THREE.Mesh;
    Cube008: THREE.Mesh;
    Cube009: THREE.Mesh;
    Cube010: THREE.Mesh;
    Cube011: THREE.Mesh;
    Cube012: THREE.Mesh;
    Cube013: THREE.Mesh;
    Cube014: THREE.Mesh;
    Cube015: THREE.Mesh;
    Cube016: THREE.Mesh;
    Cube017: THREE.Mesh;
    Cube018: THREE.Mesh;
    Text002: THREE.Mesh;
    Text003: THREE.Mesh;
    Text004: THREE.Mesh;
    Cube019: THREE.Mesh;
    Text005: THREE.Mesh;
    Cube020: THREE.Mesh;
    Text006: THREE.Mesh;
  };
  materials: {
    ['Material.003']: THREE.MeshStandardMaterial;
    ['Material.004']: THREE.MeshStandardMaterial;
    ['Material.001']: THREE.MeshStandardMaterial;
    ['Material.009']: THREE.MeshStandardMaterial;
    ['Material.011']: THREE.MeshStandardMaterial;
    ['Material.006']: THREE.MeshStandardMaterial;
    ['Material.002']: THREE.MeshStandardMaterial;
    ['Material.014']: THREE.MeshStandardMaterial;
    Material: THREE.MeshStandardMaterial;
    ['Material.007']: THREE.MeshStandardMaterial;
    ['Material.008']: THREE.MeshStandardMaterial;
  };
};

type ActionName =
  | 'Text'
  | 'Text.001'
  | 'NurbsCurve'
  | 'Cube'
  | 'Cube.001'
  | 'Cylinder'
  | 'Cylinder.001'
  | 'NurbsCurve.002'
  | 'Cube.002'
  | 'Cube.003'
  | 'Cube.004'
  | 'Cube.005'
  | 'Cube.006'
  | 'Cube.007'
  | 'Cube.008'
  | 'Cube.009'
  | 'Cube.010'
  | 'Cube.011'
  | 'Cube.012'
  | 'Cube.013'
  | 'Cube.014'
  | 'Cube.015'
  | 'Cube.016'
  | 'Cube.017'
  | 'Cube.018'
  | 'Text.002'
  | 'Text.003'
  | 'Text.004'
  | 'Cube.019'
  | 'Text.005'
  | 'Cube.020'
  | 'Text.006';
type GLTFActions = Record<ActionName, THREE.AnimationAction>;

type ContextType = Record<
  string,
  React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>
>;
const TWO_PI = 2 * Math.PI;
const Model = (props: JSX.IntrinsicElements['group']) => {
  const { frequency, area, intensityVectors, updatefemInd, femInd, stop } =
    useFaradayLaw(state => state);
  const meshAspire = useRef<THREE.Group>(null!); // nose aun
  const needle = useRef<THREE.Mesh>(null!); // aguja
  const femInduced = useRef<THREE.Mesh>(null!); // corriente
  const group = useRef<THREE.Group>(null!);
  const time = useRef<number>(0);
  const { nodes, materials } = useGLTF('/models/faraday.glb') as GLTFResult;

  const updateRotation = useCallback(() => {
    time.current += Number((1 / 30).toFixed(2));
    updatefemInd(
      Number(
        (
          area *
          intensityVectors *
          TWO_PI *
          Math.sin(TWO_PI * frequency * time.current)
        ).toFixed(2)
      )
    );
    needle.current.rotation.x = Math.sin(TWO_PI * frequency * time.current);
    femInduced.current.scale.y = -Math.cos(TWO_PI * frequency * time.current);
    meshAspire.current.rotation.z = TWO_PI * frequency * time.current;
  }, [frequency, area, femInduced]);

  useEffect(() => {
    let intervalRef: NodeJS.Timer | undefined;
    if (stop) intervalRef = setInterval(updateRotation, 1000 / 30);
    return () => {
      clearInterval(intervalRef);
    };
  }, [stop, frequency, area]);

  return (
    <group ref={group} {...props} dispose={null} position={[-1,0,-1]}>
      <group name="Scene">
        <group name="aspire" ref={meshAspire}>
          {/* ONE NUMBER */}
          <mesh
            name="Text"
            geometry={nodes.Text.geometry}
            material={materials['Material.003']}
            position={[0, 1.101, -0.002]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={0.332}
          />
          {/* TWO NUMBER */}
          <mesh
            name="Text001"
            geometry={nodes.Text001.geometry}
            material={materials['Material.004']}
            position={[0, -1.223, -0.002]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={0.332}
          />
          {/* ASPIRE */}
          <mesh
            name="NurbsCurve"
            geometry={nodes.NurbsCurve.geometry}
            material={materials['Material.001']}
            position={[-0.002, 0.054, 0.011]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          />
          {/* DS */}
          <mesh
            name="Text002"
            geometry={nodes.Text002.geometry}
            material={nodes.Text002.material}
            position={[0.121, 0.04, -0.002]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.298}
          />
          <mesh
            name="Cube017"
            geometry={nodes.Cube017.geometry}
            material={materials['Material.004']}
            position={[0.25, -0.008, -0.027]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={[-0.031, -0.231, -0.042]}
          />
          <mesh
            name="Cube018"
            geometry={nodes.Cube018.geometry}
            material={nodes.Cube018.material}
            position={[0.325, 0.197, -0.017]}
            rotation={[Math.PI / 2, 0, -Math.PI / 2]}
            scale={[-0.009, -0.05, -0.012]}
          />
          {/* ARROW FEMINDUCED */}
          <mesh
            ref={femInduced}
            name="Cube016"
            geometry={nodes.Cube016.geometry}
            material={materials['Material.004']}
            position={[0.002, 0.043, 1.38]}
            rotation={[-Math.PI, 0, 0]}
            scale={[-0.063, -0.467, -0.084]}
          />
        </group>
        <mesh
          name="Cube"
          geometry={nodes.Cube.geometry}
          material={materials['Material.009']}
          position={[-0.001, 2.069, 0.023]}
          scale={[0.283, 0.396, 1.019]}
        />
        <mesh
          name="Cube001"
          geometry={nodes.Cube001.geometry}
          material={materials['Material.011']}
          position={[-0.001, -2.091, 0.03]}
          scale={[0.283, 0.396, 1.019]}
        />
        <mesh
          name="Cylinder"
          geometry={nodes.Cylinder.geometry}
          material={materials['Material.006']}
          position={[-0.002, 0.042, -3.818]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.51, 0.176, 0.51]}
        />
        <mesh
          name="Cylinder001"
          geometry={nodes.Cylinder001.geometry}
          material={materials['Material.002']}
          position={[0.012, 0.023, -2.467]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.51, 0.176, 0.51]}
        />
        <mesh
          name="NurbsCurve002"
          geometry={nodes.NurbsCurve002.geometry}
          material={materials['Material.001']}
          position={[0.445, -0.78, -0.379]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        />
        <group
          name="Cube002"
          position={[-0.008, 1.495, -3.154]}
          scale={[0.332, 0.287, 0.41]}
        >
          <mesh
            name="Cube001_1"
            geometry={nodes.Cube001_1.geometry}
            material={nodes.Cube001_1.material}
          />
          <mesh
            name="Cube001_2"
            geometry={nodes.Cube001_2.geometry}
            material={materials['Material.014']}
          />
        </group>
        {/* needle */}
        <mesh
          ref={needle}
          name="Cube003"
          geometry={nodes.Cube003.geometry}
          material={materials.Material}
          position={[0.277, 1.356, -3.157]}
          scale={[0.01, 0.129, 0.129]}
        />
        <mesh
          name="Cube004"
          geometry={nodes.Cube004.geometry}
          material={materials['Material.007']}
          position={[0.288, 1.432, -2.899]}
          rotation={[-2.356, 0, -Math.PI]}
          scale={[-0.005, -0.045, -0.007]}
        />
        <mesh
          name="Cube005"
          geometry={nodes.Cube005.geometry}
          material={materials['Material.008']}
          position={[0.283, 1.435, -3.416]}
          rotation={[2.356, 0, -Math.PI]}
          scale={[-0.005, -0.045, -0.007]}
        />
        <mesh
          name="Cube006"
          geometry={nodes.Cube006.geometry}
          material={materials['Material.004']}
          position={[0.002, 1.529, -0.775]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.015, -0.108, -0.019]}
        />
        <mesh
          name="Cube007"
          geometry={nodes.Cube007.geometry}
          material={materials['Material.004']}
          position={[0.002, 1.529, -0.411]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.015, -0.108, -0.019]}
        />
        <mesh
          name="Cube008"
          geometry={nodes.Cube008.geometry}
          material={materials['Material.004']}
          position={[0.002, 1.529, -0.011]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.015, -0.108, -0.019]}
        />
        <mesh
          name="Cube009"
          geometry={nodes.Cube009.geometry}
          material={materials['Material.004']}
          position={[0.002, 1.529, 0.386]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.015, -0.108, -0.019]}
        />
        <mesh
          name="Cube010"
          geometry={nodes.Cube010.geometry}
          material={materials['Material.004']}
          position={[0.002, 1.529, 0.754]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.015, -0.108, -0.019]}
        />
        <mesh
          name="Cube011"
          geometry={nodes.Cube011.geometry}
          material={materials['Material.004']}
          position={[0.002, -1.453, -0.769]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.015, -0.108, -0.019]}
        />
        <mesh
          name="Cube012"
          geometry={nodes.Cube012.geometry}
          material={materials['Material.004']}
          position={[0.002, -1.453, -0.405]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.015, -0.108, -0.019]}
        />
        <mesh
          name="Cube013"
          geometry={nodes.Cube013.geometry}
          material={materials['Material.004']}
          position={[0.002, -1.453, -0.004]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.015, -0.108, -0.019]}
        />
        <mesh
          name="Cube014"
          geometry={nodes.Cube014.geometry}
          material={materials['Material.004']}
          position={[0.002, -1.453, 0.393]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.015, -0.108, -0.019]}
        />
        <mesh
          name="Cube015"
          geometry={nodes.Cube015.geometry}
          material={materials['Material.004']}
          position={[0.002, -1.453, 0.761]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-0.015, -0.108, -0.019]}
        />
        <mesh
          name="Text003"
          geometry={nodes.Text003.geometry}
          material={nodes.Text003.material}
          position={[0.38, 1.804, 0.287]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.722}
        />
        <mesh
          name="Text004"
          geometry={nodes.Text004.geometry}
          material={nodes.Text004.material}
          position={[0.344, -2.334, 0.223]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.739}
        />
        <mesh
          name="Cube019"
          geometry={nodes.Cube019.geometry}
          material={materials['Material.009']}
          position={[-0.001, -2.898, 0.038]}
          scale={[0.283, 0.396, 1.019]}
        />
        <mesh
          name="Text005"
          geometry={nodes.Text005.geometry}
          material={nodes.Text005.material}
          position={[0.38, -3.163, 0.302]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.722}
        />
        <mesh
          name="Cube020"
          geometry={nodes.Cube020.geometry}
          material={materials['Material.011']}
          position={[-0.001, 2.838, 0.022]}
          scale={[0.283, 0.396, 1.019]}
        />
        <mesh
          name="Text006"
          geometry={nodes.Text006.geometry}
          material={nodes.Text006.material}
          position={[0.344, 2.599, 0.156]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={0.755}
        />
      </group>
    </group>
  );
};

useGLTF.preload('/models/faraday.glb');

export default React.memo(Model);