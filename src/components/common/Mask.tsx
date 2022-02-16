/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { cx, css } from '@emotion/css'
import '../../styles/Mask.css';

type MaskProps = {
  count: number,
  children: JSX.Element[],
}
const Mask = ({ count, children }: MaskProps) => {
  const [state, setState] = useState<number>(0);
  const counter = (minimum: number, maximum: number) => {
    for (let count = minimum; count <= maximum; count++) {
      setTimeout(() => {
        setState(count);
      }, 300);
    }
  }
  useEffect(() => {
    if (count === 101) {
      counter(0, 1200);
    }
  }, [count]);
  return (
    <div className={container}>
      {children}
    </div>
  )
}

export default Mask;

const maskPlay = keyframes`
  0% {
    -webkit-mask-position: center;
    mask-size: 10%;
  }
  30% {
    -webkit-mask-position: center;
    mask-size: 10%;
  }
  100% {
    -webkit-mask-position: center;
    mask-size: 1000%;
  }
`

const container = css`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 14;
  mask-image: url(img/cat.svg);
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: 1000%;
  animation: ${maskPlay} 10s ease-in-out;
`;
