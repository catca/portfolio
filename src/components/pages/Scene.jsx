import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initMove,
  selectPage,
  scrollCurrentPage,
} from "../../lib/redux/page/pageSlice";
import state from "../../lib/store";
import End from "./End";
import Introduce from "./Introduce";
import Project from "./Project";
import Skill from "./Skill";

const Scene = ({ setScroll, count }) => {
  const scrollArea = useRef(null);
  const { currentPage, move } = useSelector(selectPage);
  const dispatch = useDispatch();

  useEffect(() => {
    document.getElementById("scrollArea").scrollTo({
      top: (currentPage - 1) * window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
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
          if (currentPage !== 2) {
            setScroll(true);
          }
        }
      }
    }
  };

  return (
    <div
      className="scrollArea"
      id="scrollArea"
      ref={scrollArea}
      onScroll={onScroll}
      style={{ color: "#FFFFFF" }}
    >
      <section className="section">
        <Introduce count={count} />
      </section>
      {/* <section className='section'>
        <Skill />
      </section> */}
      <section className="section">
        <Project setScroll={setScroll} />
      </section>
      <section className="section">
        <End />
      </section>
    </div>
  );
};

export default React.memo(Scene);
