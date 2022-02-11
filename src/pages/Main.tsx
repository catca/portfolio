import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Gallery from "../components/Gallery";
import Scene from "../components/Scene";

export default function App() {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    console.log(scroll);
  }, [scroll])
  return (
    <>
      <Header />
      <Gallery scroll={scroll} setScroll={setScroll}/>
      <Scene setScroll={setScroll}/>
    </>
  );
}
