/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from "react";
import { keyframes } from "@emotion/react";
import { css } from '@emotion/css'
import '../../styles/Mask.css';

type MaskProps = {
  children: JSX.Element[],
}
const Mask = ({ children }: MaskProps) => {
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
    mask-size: 500px;
  }
  70% {
    -webkit-mask-position: center;
    mask-size: 500px;
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
  animation: ${maskPlay} 10s ease-out;
`;
