import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import Frames from './Frames';
import Stars from './Stars';
import Planet from './Planet';

import { useSelector } from 'react-redux';
import { selectPage } from '../../lib/redux/page/pageSlice';

const randomPos = (min = 5, max = -5) => Math.random() * (max - min) + min;

const Gallery = ({ count, scroll, setScroll }: { count: number, scroll: boolean, setScroll: (value: boolean) => void }) => {
  const momentsArray = useMemo(() => Array.from({ length: 300 }, () => ({ position: [randomPos(), randomPos(), randomPos() + 2], speed: Math.random() * 0.5 + 0.25 })), []);
  const { currentPage } = useSelector(selectPage);

  return (
    <Suspense fallback={null}>
      <Canvas shadows style={{ zIndex: `${scroll ? -1 : (currentPage === 3 ? 10 : -1)}` }} >
        <directionalLight color={'#5CFFD1'} position={[0, 10, 0]} castShadow />
        <color attach="background" args={[`#${currentPage * 2 + 10}${currentPage * 2 + 10}${currentPage * 2 + 10}`]} />
        <pointLight intensity={1} position={[0, 10, 0]} castShadow decay={0} />
        <ambientLight />
        <spotLight position={[0, 15, 2]} angle={0.4} penumbra={1} intensity={1} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} />
        {(!scroll || count < 10) &&
          <group position={[0, -0.5, 0]}>
            <Frames setScroll={setScroll} />
          </group>
        }
        <Planet />
        <Stars momentsData={momentsArray} currentPage={currentPage} />
      </Canvas>
    </Suspense>
  )
};

export default React.memo(Gallery);