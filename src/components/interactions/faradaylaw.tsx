import { Suspense, lazy } from 'react';
import { Environment, OrbitControls, Preload, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import PanelsFaradayLaw from '@panels/faradaylaw';
const ModelFaradayLaw = lazy(() => import('@interactions/models/FaradayLaw'));

function FaradayLaw() {
  console.log('FaradayLaw re-endering');
  return (
    <div className="w-full h-full bg-white">
      <Canvas
        camera={{ position: [0.1, 0.01, 0], fov: 40 }}
        eventPrefix="client"
        className="w-full h-full"
      >
        <Suspense fallback={<>Cargando ...</>}>
          <Stage>
            <ModelFaradayLaw />
            <Preload all />
          </Stage>
        </Suspense>
        <Environment preset="warehouse" background blur={0.9} />
        <OrbitControls />
      </Canvas>
      <PanelsFaradayLaw />
    </div>
  );
}

export default FaradayLaw;
