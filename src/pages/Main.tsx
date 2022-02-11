import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Gallery from "../components/Gallery";
import Scene from "../components/Scene";

export default function App() {
  return (
    <>
      <Header />
      <Gallery />
      <Scene />
    </>
  );
}
