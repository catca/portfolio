import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export default function Planet() {
  const planetRef = useRef<THREE.Mesh>();
  const [radius, setRadius] = useState(0);
  const repeatX = 3;
  const repeatY = 2;
  // const [base, bump, normal, ao, metal, rough, glass] = useLoader(
  //   THREE.TextureLoader,
  //   [
  //     "img/stained/Glass_Stained_001_basecolor.jpg",
  //     "img/stained/Glass_Stained_001_height.png",
  //     "img/stained/Glass_Stained_001_normal.jpg",
  //     "img/stained/Glass_Stained_001_ambientOcclusion.jpg",
  //     "img/stained/Glass_Stained_001_metallic.jpg",
  //     "img/stained/Glass_Stained_001_roughness.jpg",
  //     "img/stained/Glass_Stained_001_Glass.jpg",
  //   ]
  // );
  const [base, bump, normal, ao, rough] = useLoader(
    THREE.TextureLoader,
    [
      "img/planet/Agate_002_COLOR.jpg",
      "img/planet/Agate_002_DISP.png",
      "img/planet/Agate_002_NORM.jpg",
      "img/planet/Agate_002_OCC.jpg",
      "img/planet/Agate_002_ROUGH.jpg",
    ]
  );

  [base, bump, normal, ao, rough].forEach((texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(repeatX, repeatY);
  });
  useEffect(() => {
    const x = planetRef.current!.position.x;
    const z = planetRef.current!.position.z;
    setRadius(Math.sqrt(x * x + (z + 5) * (z + 5)));
  }, [])
  useFrame((state) => {
    if (radius) {
      const time = state.clock.elapsedTime;
      const speed = 0.8;
      planetRef.current!.position.x = Math.cos(time * speed) * radius;
      planetRef.current!.position.z = Math.sin(time * speed) * radius - 5;
      planetRef.current!.rotation.y = time * speed * 6;
    }
  })
  return (
    <mesh ref={planetRef} position={[4, -3, 2]} receiveShadow>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshPhysicalMaterial
        map={base}
				bumpMap={bump}
				aoMap={ao}
				normalMap={normal}
				roughnessMap={rough}
      />
      <spotLight position={[0, 0, 1]} intensity={1} />
    </mesh>
  )
}