import React, { useState } from "react";
import Mask from "../components/common/Mask";
import Loading from "../components/common/Loading";
import Header from "../components/common/Header";
import Gallery from "../components/three/Gallery";
import Scene from "../components/pages/Scene";
import { AnimatedCursor } from "../components/common/AnimatedCursor";

export default function App() {
  const [scroll, setScroll] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <Mask>
        <AnimatedCursor />
        <Loading count={count} setCount={setCount} />
        <Header />
        <Gallery scroll={scroll} setScroll={setScroll} />
        <Scene setScroll={setScroll} count={count} />
      </Mask>
    </div>
  );
}