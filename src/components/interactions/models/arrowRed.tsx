import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { MutableRefObject } from 'react';
import { ReactThreeFiber } from '@react-three/fiber';

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Cube001: THREE.Mesh;
  };
  materials: {
    ['Material.005']: THREE.MeshStandardMaterial;
    ['Material.006']: THREE.MeshStandardMaterial;
  };
};

interface ArrowRedProps
  extends Omit<
    ReactThreeFiber.Object3DNode<
      THREE.Group,
      typeof THREE.Group
    >,
    'children'
  > {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  movimiento?: MutableRefObject<any>;
  position?: [number, number, number];
}

export function ArrowRed(props: ArrowRedProps) {
  const { nodes, materials } = useGLTF(
    '/models/ArrowRed.glb'
  ) as GLTFResult;
  return (
    <group {...props} dispose={null} ref={props.movimiento}>
      <mesh
        geometry={nodes.Cube.geometry}
        material={materials['Material.005']}
        position={[0, 2, 0]}
        scale={[0.82, 0.08, 0.08]}
      />
      <mesh
        geometry={nodes.Cube001.geometry}
        material={materials['Material.006']}
        position={[0, 1.03, 0]}
        scale={[0.11, 1.02, 0.07]}
      />
    </group>
  );
}

useGLTF.preload('/models/ArrowRed.glb');
