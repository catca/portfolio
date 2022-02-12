import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Gallery from "../components/three/Gallery";
import Scene from "../components/pages/Scene";

export default function App() {
  const [scroll, setScroll] = useState(false);
  return (
    <>
      <Header />
      <Gallery scroll={scroll} setScroll={setScroll}/>
      <Scene setScroll={setScroll}/>
    </>
  );
}
