import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import Frames from './Frames';
import Stars from './Stars';
import Planet from './Planet';

const randomPos = (min = 4, max = -4) => Math.random() * (max - min) + min

const images = [
  // Front
  { position: [0, 0, 2], rotation: [0, 0, 0], url: '/img/gallery/portfolio.PNG', intro: 'portfolio', href: 'http://localhost:3000' },
  // Left
  { position: [-2.2, 0, 2.2], rotation: [0, Math.PI / 7, 0], url: '/img/gallery/shiningstargram.PNG', intro: 'shiningstargram', href: 'https://shiningstargram.vercel.app' },
  // Right
  { position: [2.2, 0, 2.2], rotation: [0, -Math.PI / 7, 0], url: '/img/gallery/bunnymarket.PNG', intro: 'bunnymarket', href: 'http://bunnymarket.o-r.kr:3000' },
]

export default function Gallery() {
  const momentsArray = useMemo(() => Array.from({ length: 200 }, () => ({ position: [randomPos(), randomPos(), randomPos() + 2], speed: Math.random() * 0.5 + 0.25 })), [])
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
      <directionalLight color={'#5CFFD1'} position={[0, 10, 0]} intentsity={1} castShadow/>
      <color attach="background" args={['#191920']} />
      <pointLight intensity={1} position={[0, 10, 0]} castShadow decay={0}/>
      <ambientLight intentsity={10}/>
      <spotLight position={[0, 15, 2]} angle={0.4} penumbra={1} intensity={1} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} />
      <group position={[0, -0.5, 0]}>
        <Frames images={images} />
      </group>
      <Planet />
      <Stars momentsData={momentsArray}/>
      </Canvas>
    </Suspense>
  )
}
