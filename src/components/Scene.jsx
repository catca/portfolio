import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { initMove, selectPage, scrollCurrentPage } from '../lib/redux/page/pageSlice';
import state from "../lib/store";

export default function Scene() {
  const scrollArea = useRef(null);
  const { currentPage, move } = useSelector(selectPage);
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById('scrollArea').scrollTo({ top: (currentPage - 1) * window.innerHeight, left: 0, behavior: 'smooth' });
  }, [currentPage]);

  const onScroll = () => {
    if (scrollArea.current) {
      const tempPage = scrollArea.current.scrollTop / window.innerHeight;
      state.scroll.current = scrollArea.current.scrollTop;
      if (Math.abs(tempPage - Math.round(tempPage)) < 0.1) {
        if (move) {
          if (Math.round(tempPage) + 1 === currentPage) {
            dispatch(initMove());
          }
        } else {
          dispatch(scrollCurrentPage(Math.round(tempPage) + 1));
        }
      }
    }
  }

  return (
    <div className="scrollArea" id="scrollArea" ref={scrollArea} onScroll={onScroll} style={{ color: '#FFFFFF' }}>
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
