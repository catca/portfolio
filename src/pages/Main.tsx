import React, { useState } from "react";
import Mask from "../components/common/Mask";
import Loading from "../components/common/Loading";
import Header from "../components/common/Header";
import Gallery from "../components/three/Gallery";
import Scene from "../components/pages/Scene";

export default function App() {
  const [scroll, setScroll] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <Loading count={count} setCount={setCount}/>
      <Mask count={count}>
        <Header />
        <Gallery scroll={scroll} setScroll={setScroll}/>
        <Scene setScroll={setScroll}/>
      </Mask>
    </div>
  );
}