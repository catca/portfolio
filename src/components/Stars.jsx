import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber'

export default function Stars({ momentsData }) {
  return momentsData.map(({ position, speed }, i) => (
    <Tetrahedron key={i} position={position} speed={speed} index={i}/>
  ))
}

function Tetrahedron({ position, index, speed }) {
  const tetrahedronRef = useRef();
  const [orbital, setOrbital] = useState(0);
  useEffect(() => {
    const x = tetrahedronRef.current.position.x;
    const z = tetrahedronRef.current.position.z;
    setOrbital(Math.sqrt(x * x + (z - 2) * (z - 2)));
  }, [])
  useFrame((state) => {
    if (orbital) {
      const time = state.clock.elapsedTime;
      tetrahedronRef.current.position.x = Math.cos(time * speed) * orbital;
      tetrahedronRef.current.position.z = Math.sin(time * speed) * orbital + 2;
      tetrahedronRef.current.rotation.x += 0.03 * Math.sin(time * Math.random()) + 0.03;
      tetrahedronRef.current.rotation.y += 0.03 * Math.sin(time * Math.random()) + 0.03;
      tetrahedronRef.current.rotation.z += 0.03 * Math.sin(time * Math.random()) + 0.03;
    }
  })
  return (
    <mesh castShadow key={index} ref={tetrahedronRef} position={position} rotation={position}>
      <tetrahedronGeometry
        attach="geometry"
        args={[0.02, 0]}
        applyMatrix={new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(2, 0, -1).normalize(),
          Math.atan(Math.sqrt(2))
        )}
        castShadow
      />
      <meshStandardMaterial color={'#FFFFFF'} metalness={1} castShadow/>
    </mesh>
  )
}