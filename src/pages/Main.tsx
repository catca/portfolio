import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import Gallery from "../components/Gallery";
import Scene from "../components/Scene";

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  return (
    <>
      <Header setCurrentPage={setCurrentPage}/>
      <Gallery />
      <Scene currentPage={currentPage}/>
    </> 
  );
}
