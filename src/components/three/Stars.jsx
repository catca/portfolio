import * as THREE from 'three';
import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import state from "../../lib/store";

export default function Stars({ momentsData, currentPage, p = new THREE.Vector3(), q = new THREE.Quaternion() }) {
  useFrame(() => {
    if (state.scroll) {
      // if (currentPage === 3) return;
      p.set(0, 0, - state.scroll.current * 3 / window.innerHeight + 12);
    }
  })
  useFrame((state, dt) => {
    // damp 함수 안의 변수 변경 0, 1, 3 => 0, 1, 2
    state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 4, 0.016));
    // 0, 1, 3 => 1(중요), 1, 10
    state.camera.quaternion.slerp(q, THREE.MathUtils.damp(1, 1, 10, 0.016));
  })
  return momentsData.map(({ position, speed }, i) => (
    <Tetrahedron key={i} position={position} speed={speed} index={i} />
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
      <meshStandardMaterial color={'#FFFFFF'} metalness={1} castShadow />
    </mesh>
  )
}