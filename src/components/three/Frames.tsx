import * as THREE from "three";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { useCursor, Image, Text, Html } from "@react-three/drei";
import getUuid from "uuid-by-string";
import { Group } from "three";
import styled from "@emotion/styled";

const GOLDENRATIO = 1.61803398875;
const images = [
  // Front
  {
    position: [0, 0, 2],
    rotation: [0, 0, 0],
    url: "/img/gallery/PengCatPuzzle.PNG",
    intro: "PengCatPuzzle",
    href: "https://pengcatpuzzle.vercel.app/",
    git: "https://github.com/penguinAndCat/puzzle",
    notion: "",
    img: "/img/puzzleLogo.PNG",
    explanation: ` 직소 퍼즐을 맞출 수 있는 웹사이트입니다.\nCanvas와 Paper.js를 사용해 직소 퍼즐을 구현하였습니다.\n 소켓 통신으로 다른 사람들과 함께 맞출 수 있습니다.`,
  },
  // Right
  {
    position: [2.2, 0, 2.2],
    rotation: [0, -Math.PI / 7, 0],
    url: "/img/gallery/portfolio.PNG",
    intro: "portfolio",
    href: "https://catca-portfolio.vercel.app/",
    git: "https://github.com/catca/portfolio",
    notion:
      "https://gorgeous-orbit-6d2.notion.site/b9eefeb27efe4a81acf301ad2dd5e9fc",
    img: "",
    explanation: ` react, typescript를 기반으로 제작한 포트폴리오.\nthree.js를 사용하여 우주에 있는 듯한 느낌을 연출하였습니다.\nsvg, js를 활용하여 여러 가지 애니메이션을 주었습니다.`,
  },
  // Left
  {
    position: [-2.2, 0, 2.2],
    rotation: [0, Math.PI / 7, 0],
    url: "/img/gallery/shiningstargram.PNG",
    intro: "shiningstargram",
    href: "https://shiningstargram.vercel.app",
    git: "https://github.com/intsa-fullstack/shiningstar",
    notion:
      "https://gorgeous-orbit-6d2.notion.site/shiningstargram-2021-09-2022-01-52e32beacb3a49ae85862949941fd9ces",
    img: "/img/stargram.png",
    explanation:
      " react, next, typescript를 기반으로 제작한 SNS 웹사이트 입니다.",
  },
];

interface Framesprops {
  setScroll: (value: boolean) => void;
  q?: THREE.Quaternion;
  p?: THREE.Vector3;
}
interface Frameprops {
  url: string;
  intro: string;
  href: string;
  git: string;
  notion: string;
  img: string;
  clicked: MutableRefObject<any>;
  c?: THREE.Color;
  explanation: string;
  objectName: string;
  setObjectName: (value: string) => void;
}

export default function Frames({
  setScroll,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}: Framesprops) {
  const ref = useRef<Group>();
  const clicked = useRef<any>();
  const [objectName, setObjectName] = useState<string>("");

  useEffect(() => {
    if (objectName === "") {
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
  });

  useEffect(() => {
    const listener = () => {
      setScroll(true);
    };
    return () => {
      window.removeEventListener("wheel", listener);
    };
  });

  useFrame((state, dt) => {
    // damp 함수 안의 변수 변경 0, 1, 3 => 0, 1, 2
    state.camera.position.lerp(p, THREE.MathUtils.damp(0, 1, 4, 0.016));
    // 0, 1, 3 => 1(중요), 1, 10
    state.camera.quaternion.slerp(q, THREE.MathUtils.damp(1, 1, 10, 0.016));
  });

  const onPointerMissed = () => {
    setObjectName("");
    clicked.current = undefined;
  };

  return (
    <group ref={ref} onPointerMissed={onPointerMissed}>
      {images.map(
        (props) => <Frame key={props.url} clicked={clicked} setObjectName={setObjectName} objectName={objectName} {...props} /> /* prettier-ignore */
      )}
    </group>
  );
}

function Frame({
  url,
  c = new THREE.Color(),
  intro,
  href,
  git,
  notion,
  img,
  explanation,
  clicked,
  setObjectName,
  objectName,
  ...props
}: Frameprops) {
  const [hovered, hover] = useState(false);
  const [object, setObject] = useState<any>();
  const [rnd] = useState(() => Math.random());
  const image = useRef<any>();
  const frame = useRef<any>();
  const name = getUuid(url);
  useCursor(hovered);
  useFrame((state) => {
    image.current.material.zoom = hovered
      ? 0.5
      : 0.75 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 4;
    image.current.scale.x = THREE.MathUtils.lerp(
      image.current.scale.x,
      0.85 * (hovered ? 0.85 : 1),
      0.1
    );
    image.current.scale.y = THREE.MathUtils.lerp(
      image.current.scale.y,
      0.9 * (hovered ? 0.905 : 1),
      0.1
    );
    frame.current!.material.color.lerp(
      c.set(hovered ? "#C0C0C0" : "white").convertSRGBToLinear(),
      0.1
    );
  });

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setObject(e.object);
    if (clicked.current === e.object) {
      document.location.href = href;
    } else {
      setObjectName(e.object.name);
    }
  };
  const onClickLink = () => {
    window.open(href, "_blank");
  };
  return (
    <group {...props}>
      <mesh
        name={name}
        onClick={(e) => handleClick(e)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
        scale={[GOLDENRATIO, 1, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
          castShadow
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image
          raycast={() => null}
          ref={image}
          position={[0, 0, 0.7]}
          url={url}
        />
      </mesh>
      <Text
        maxWidth={0.1}
        anchorX="left"
        anchorY="top"
        position={[0.25, 1.5, 0]}
        fontSize={0.1}
        onClick={onClickLink}
      >
        {intro}
      </Text>
      {object?.name === objectName && (
        <Html center>
          <Container>
            <Explanation>
              {explanation.split("\n").map((line) => {
                return (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                );
              })}
            </Explanation>
            <SeeMore>
              <A href={git} target="_blank" rel="noopener noreferrer">
                <img
                  src={"img/github.png"}
                  alt={"github"}
                  width={32}
                  height={32}
                />
              </A>
              {notion !== "" && (
                <A href={notion} target="_blank" rel="noopener noreferrer">
                  <img
                    src={"img/notion.png"}
                    alt={"notion"}
                    width={32}
                    height={32}
                  />
                </A>
              )}
              {img !== "" && (
                <A href={href} target="_blank" rel="noopener noreferrer">
                  <img src={img} alt={intro} width={32} height={32} />
                </A>
              )}
            </SeeMore>
          </Container>
        </Html>
      )}
    </group>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  color: #f9faff;
  padding: 4px 20px;
  border-radius: 10px;
  border: 3px solid #5cffd1;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(238, 237, 242, 0.34);
  border-radius: 0.9em;
  background-image: linear-gradient(
    128deg,
    rgba(0, 0, 0, 0.35),
    rgba(26, 34, 41, 0.5) 50%
  );
`;

const Explanation = styled.div``;

const SeeMore = styled.div`
  margin-top: 4px;
  & > a {
    width: 32px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 50%;
    margin-right: 12px;
  }
  & > a:last-of-type {
    margin-right: 0px;
  }
`;

const A = styled.a`
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
`;
