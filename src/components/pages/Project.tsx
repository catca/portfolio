import React, { useRef, useEffect } from "react";
import styled from '@emotion/styled';

const Project = ({setScroll}: {setScroll: (value: boolean) => void}) => {
  const onClick = () => {
    setScroll(false);
    window.addEventListener("wheel", (e) => setScroll(true));
  }
  return (
    <Conatiner>
      <H1>
        
      </H1>
      <Title>
        <div onClick={onClick} style={{cursor: 'pointer'}}>프로젝트 불러오기!</div>
      </Title>
    </Conatiner>
  );
}

export default React.memo(Project);

const Conatiner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H1 = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  margin-top: 96px;
`;