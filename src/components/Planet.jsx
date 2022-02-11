import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export default function Planet() {
  const planetRef = useRef();
  const [radius, setRadius] = useState(0);
  useEffect(() => {
    const x = planetRef.current.position.x;
    const z = planetRef.current.position.z;
    setRadius(Math.sqrt(x * x + (z - 2) * (z - 2)));
  }, [])
  useFrame((state) => {
    if (radius) {
      const time = state.clock.elapsedTime;
      const speed = 1.4;
      planetRef.current.position.x = Math.cos(time * speed) * radius;
      planetRef.current.position.y = -Math.cos(time * speed) * radius;
      planetRef.current.position.z = Math.sin(time * speed) * radius + 2;
    }
  })
  return (
    <mesh ref={planetRef} position={[23, -1.3, 2]} receiveShadow>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshPhysicalMaterial
        roughness={1}
        metalness={1}
        color="#FFFFFF"
      />
      <spotLight position={[0, 0, 1]} intensity={1} />
    </mesh>
  )
}