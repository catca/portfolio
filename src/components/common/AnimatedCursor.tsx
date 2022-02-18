import React, { Fragment, useCallback, useEffect, useRef, useState } from "react"
import styled from "@emotion/styled"
import { useEventListener } from "../../lib/hooks"

export const AnimatedCursor = () => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<any>(null);
  const previousTimeRef = useRef();
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  let endX = useRef(0);
  let endY = useRef(0);

  const onMouseMove = useCallback(({ clientX, clientY }) => {
    setCoords({ x: clientX, y: clientY });
    cursorInnerRef.current!.style.top = clientY + 'px';
    cursorInnerRef.current!.style.left = clientX + 'px';
    endX.current = clientX;
    endY.current = clientY;
  }, []);

  const animateOuterCursor = useCallback(
    (time) => {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / 8;
        coords.y += (endY.current - coords.y) / 8;
        cursorOuterRef.current!.style.top = coords.y + 'px';
        cursorOuterRef.current!.style.left = coords.x + 'px';
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateOuterCursor);
    },
    [requestRef] // eslint-disable-line
  )

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor);
  }, [])

  useEventListener('mousemove', onMouseMove);

  return (
    <Fragment>
      <CursorOuter ref={cursorOuterRef} />
      <CursorInner ref={cursorInnerRef} />
    </Fragment>
  )
}

const CursorInner = styled.div`
  z-index: 999;
  position: fixed;
  borderRadius: 50%;
  width: 8px;
  height: 8px;
  pointerEvents: none;
  background-color: rgba(92, 255, 209, 1);
  transition: opacity 0.15s ease-in-out, transform 0.25s ease-in-out;
  border-radius: 50%;
  pointer-events: none;
`;

const CursorOuter = styled.div`
  z-index: 999;
  position: fixed;
  borderRadius: 50%;
  width: 8px;
  height: 8px;
  pointerEvents: none;
  background-color: rgba(92, 255, 209, 0.4);
  transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
  border-radius: 50%;
  pointer-events: none;
`;