import React, { useRef } from "react";
import state from "../lib/store";

export default function App() {
  const scrollArea = useRef(null);
  const onScroll = () => {
    if (scrollArea.current) {
      state.scroll.current = scrollArea.current.scrollTop;
    }
  }
  return (
    <div className="scrollArea" ref={scrollArea} onScroll={onScroll} style={{ color: '#FFFFFF' }}>
      <section className='section'>
        안녕하세요 저는 저입니다. 저를 보고 너무 기쁘셨죠? 어쩌라구요 저쩔티비!! 안녕하지못해요 저는요 저도요
      </section>
      <section className='section'>
        2
      </section>
      <section className='section'>
        3
      </section>
      <section className='section'>
        4
      </section>
    </div>
  );
}
