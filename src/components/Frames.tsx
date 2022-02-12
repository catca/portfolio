import * as THREE from 'three';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useCursor, Image, Text } from '@react-three/drei';
import { useRoute, useLocation } from 'wouter';
import getUuid from 'uuid-by-string';
import { Object3D, Group, Mesh } from 'three';

const GOLDENRATIO = 1.61803398875;
const images = [
  // Front
  { position: [0, 0, 2], rotation: [0, 0, 0], url: '/img/gallery/portfolio.PNG', intro: 'portfolio', href: 'http://localhost:3000' },
  // Left
  { position: [-2.2, 0, 2.2], rotation: [0, Math.PI / 7, 0], url: '/img/gallery/shiningstargram.PNG', intro: 'shiningstargram', href: 'https://shiningstargram.vercel.app' },
  // Right
  { position: [2.2, 0, 2.2], rotation: [0, -Math.PI / 7, 0], url: '/img/gallery/bunnymarket.PNG', intro: 'bunnymarket', href: 'http://bunnymarket.o-r.kr:3000' },
]

interface Framesprops {
  setScroll: (value: boolean) => void,
  q?: THREE.Quaternion,
  p?: THREE.Vector3,
}

export default function Frames({ setScroll, q = new THREE.Quaternion(), p = new THREE.Vector3() }: Framesprops) {
  const ref = useRef<Group>();
  const clicked = useRef<any>();
  const [, params] = useRoute<any>('/item/:id');
  const [, setLocation] = useLocation();

  useEffect(() => {
    clicked.current = ref.current!.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, -0.5));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  })
  useEffect(() => {
    const listener = () => {
      setScroll(true);
    }
    return () => {
      window.removeEventListener("wheel", listener);
    };
  });

  useFrame((state, dt) => {
    // damp 함수 안의 변수 변경 0, 1, 3 => 0, 1, 2
    state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 4, 0.016));
    // 0, 1, 3 => 1(중요), 1, 10
    state.camera.quaternion.slerp(q, THREE.MathUtils.damp(1, 1, 10, 0.016));
  })
  return (
    <group
      ref={ref}
      onPointerMissed={() => setLocation('/')}>
      {images.map((props) => <Frame key={props.url} clicked={clicked} {...props}/> /* prettier-ignore */)}
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), intro, href, clicked, ...props }: {url: string, intro: string, href: string, clicked: MutableRefObject<any>, c?: THREE.Color}) {
  const [hovered, hover] = useState(false);
  const [rnd] = useState(() => Math.random());
  const image = useRef<any>();
  const frame = useRef<any>();
  const name = getUuid(url);
  const [, setLocation] = useLocation();
  useCursor(hovered);
  useFrame((state) => {
    image.current.material.zoom = hovered ? 0.5 : 0.75 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 4;
    image.current.scale.x = THREE.MathUtils.lerp(image.current.scale.x, 0.85 * (hovered ? 0.85 : 1), 0.1);
    image.current.scale.y = THREE.MathUtils.lerp(image.current.scale.y, 0.9 * (hovered ? 0.905 : 1), 0.1);
    frame.current!.material.color.lerp(c.set(hovered ? '#C0C0C0' : 'white').convertSRGBToLinear(), 0.1);
  })
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (clicked.current === e.object) {
      document.location.href = href;
    } else {
      setLocation(`/item/${e.object.name}`);
    }
  }
  return (
    <group {...props}>
      <mesh
        name={name}
        onClick={(e) => handleClick(e)}
        onPointerOver={(e) => { e.stopPropagation(); hover(true) }}
        onPointerOut={() => hover(false)}
        scale={[GOLDENRATIO, 1, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}>
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]} castShadow>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
      </mesh>
      <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.25, 1.5, 0]} fontSize={0.1} onClick={() => document.location.href = href}>
        {intro}
      </Text>
    </group>
  )
}