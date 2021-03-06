import React, { useState } from "react";
import Mask from "../components/common/Mask";
import Loading from "../components/common/Loading";
import Header from "../components/common/Header";
import Gallery from "../components/three/Gallery";
import Scene from "../components/pages/Scene";
import { AnimatedCursor } from "../components/common/AnimatedCursor";

export default function App() {
  const [scroll, setScroll] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <Mask>
        <AnimatedCursor />
        <Loading count={count} setCount={setCount} />
        <Header />
        <Scene count={count} setScroll={setScroll} />
        <Gallery count={count} scroll={scroll} setScroll={setScroll} />
      </Mask>
    </div>
  );
}