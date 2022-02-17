import React from "react";
import styled from '@emotion/styled';
import { keyframes } from "@emotion/react";
import { css } from "@emotion/css";
import { FrontStatus, LibraryNBackStatus } from "../svg/Status";

const Skill = () => {
  return (
    <Conatiner>
      <div>
        <Title>Front skill</Title>
        <FrontStatus />
      </div>
      <div>
        <Title>library & Back skill</Title>
        <LibraryNBackStatus />
      </div>
    </Conatiner>
  );
}

export default React.memo(Skill);

const Conatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  & > div:first-of-type {
    margin-right: 36px;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 600;
  color: #00b841;
`;

const linePlay = keyframes`
  0% {
    stroke-dashoffset: 800;
  }
  10% {
    stroke-dashoffset: 0;
  }
  70% {
    stroke-dashoffset: 0;
  }
  90% {
    stroke-dashoffset: -800;  
  }
  100% {
    stroke-dashoffset: -800;
  }
`

const toolLine = css`
stroke-dasharray: 800;
stroke-dashoffset: 800;
animation: ${linePlay} 6s ease-out infinite forwards;
`;
