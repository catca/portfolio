import * as THREE from 'three';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import { useCursor, Image, Text, Html } from '@react-three/drei';
import getUuid from 'uuid-by-string';
import { Object3D, Group, Mesh } from 'three';
import styled from '@emotion/styled';
import { assertJSXExpressionContainer } from '@babel/types';

const GOLDENRATIO = 1.61803398875;
const images = [
  // Front
  {
    position: [0, 0, 2],
    textPosition: [-0.92, 0.2, 0],
    rotation: [0, 0, 0],
    url: '/img/gallery/portfolio.PNG',
    intro: 'portfolio',
    href: 'http://localhost:3000',
    explanation: ` react, typescript를 기반으로 제작한 포트폴리오.\nthree.js를 사용하여 우주에 있는 듯한 느낌을 연출하였다.`
  },
  // Left
  {
    position: [-2.2, 0, 2.2],
    textPosition: [-1, 0.2, 0],
    rotation: [0, Math.PI / 7, 0],
    url: '/img/gallery/shiningstargram.PNG',
    intro: 'shiningstargram',
    href: 'https://shiningstargram.vercel.app',
    explanation: ' react, next, typescript를 기반으로 제작한 SNS 웹사이트 입니다.'
  },
  // Right
  {
    position: [2.2, 0, 2.2],
    textPosition: [-1, 0.2, 0],
    rotation: [0, -Math.PI / 7, 0],
    url: '/img/gallery/bunnymarket.PNG',
    intro: 'bunnymarket',
    href: 'http://bunnymarket.o-r.kr:3000',
    explanation: ' react를 기반으로 제작한 중고마켓 플랫폼 입니다.\njavascript, spring으로 만든 졸업작품을 react로 리팩토링한 웹사이트 입니다.'
  },
]

interface Framesprops {
  setScroll: (value: boolean) => void,
  q?: THREE.Quaternion,
  p?: THREE.Vector3,
}
interface Frameprops {
  url: string,
  intro: string,
  href: string,
  clicked: MutableRefObject<any>,
  c?: THREE.Color,
  explanation: string,
  textPosition: any,
  objectName: string,
  setObjectName: (value: string) => void,
}

export default function Frames({ setScroll, q = new THREE.Quaternion(), p = new THREE.Vector3() }: Framesprops) {
  const ref = useRef<Group>();
  const clicked = useRef<any>();
  const [objectName, setObjectName] = useState<string>('');

  useEffect(() => {
    if (objectName === '') {
      p.set(0, 0, 5.5);
      q.identity();
      return;
    }
    clicked.current = ref.current!.getObjectByName(objectName);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, -0.5));
      clicked.current.parent.getWorldQuaternion(q);
    } 
  })
  useEffect(() => {
    console.log(objectName);
    clicked.current = ref.current!.getObjectByName(objectName);
  }, [objectName])
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

  const onPointerMissed = () => {
    setObjectName('');
    clicked.current = undefined;
  }
  return (
    <group
      ref={ref}
      onPointerMissed={onPointerMissed}>
      {images.map((props) => <Frame key={props.url} clicked={clicked} setObjectName={setObjectName} objectName={objectName} {...props}/> /* prettier-ignore */)}
    </group>
  )
}

function Frame({ url, c = new THREE.Color(), textPosition, intro, href, explanation, clicked, setObjectName, objectName, ...props }: Frameprops) {
  const [hovered, hover] = useState(false);
  const [object, setObject] = useState<any>();
  const [rnd] = useState(() => Math.random());
  const image = useRef<any>();
  const frame = useRef<any>();
  const name = getUuid(url);
  useCursor(hovered);
  useFrame((state) => {
    image.current.material.zoom = hovered ? 0.5 : 0.75 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 4;
    image.current.scale.x = THREE.MathUtils.lerp(image.current.scale.x, 0.85 * (hovered ? 0.85 : 1), 0.1);
    image.current.scale.y = THREE.MathUtils.lerp(image.current.scale.y, 0.9 * (hovered ? 0.905 : 1), 0.1);
    frame.current!.material.color.lerp(c.set(hovered ? '#C0C0C0' : 'white').convertSRGBToLinear(), 0.1);
  })
  useEffect(() => {
    console.log(clicked.current, object, objectName);
  }, [object])

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setObject(e.object);
    if (clicked.current === e.object) {
      document.location.href = href;
    } else {
      setObjectName(e.object.name);
    }
  }
  const onClickLink = () => {
    document.location.href = href;
  }
  return (
    <group {...props}>
      <mesh
        name={name}
        onClick={(e) => handleClick(e)}
        onPointerOver={() => hover(true) }
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
      <Text maxWidth={0.1} anchorX="left" anchorY="top" position={[0.25, 1.5, 0]} fontSize={0.1} onClick={onClickLink}>
        {intro}
      </Text>
      {object.name === objectName &&
        <Html position={textPosition}>
          <Container>
            <Explanation>
              {explanation.split('\n').map((line) => {
                return (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                )})
              }
            </Explanation>
            <SeeMore>
              <span onClick={onClickLink}>
                더보기
              </span>
            </SeeMore>
          </Container>
        </Html>
      }
    </group>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  color: #000000;
  background-color: #FFFFFF;
  padding: 20px;
  background-image: -webkit-repeating-linear-gradient(bottom, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0)   6%, hsla(0,0%,100%, .1) 7.5%),
    -webkit-repeating-linear-gradient(bottom, hsla(0,0%,  0%,0) 0%, hsla(0,0%,  0%,0)   4%, hsla(0,0%,  0%,.03) 4.5%),
    -webkit-repeating-linear-gradient(bottom, hsla(0,0%,100%,0) 0%, hsla(0,0%,100%,0) 1.2%, hsla(0,0%,100%,.15) 2.2%),
    
    linear-gradient(180deg, hsl(0,0%,78%)  0%, 
    hsl(0,0%,90%) 47%, 
    hsl(0,0%,78%) 53%,
    hsl(0,0%,70%)100%);
  border-radius: 10px;
  border: 3px solid #000;
`;

const Explanation = styled.div`

`;

const SeeMore = styled.div`
  & > span {
    color: #666666;
    cursor: pointer;
  }
`;