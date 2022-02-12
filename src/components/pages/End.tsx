import React, { useRef, useEffect } from "react";
import styled from '@emotion/styled';

const End = () => {
  return (
    <Conatiner>
      <H1>
        
      </H1>
      <Title>
        
      </Title>
    </Conatiner>
  );
}

export default React.memo(End);

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
  font-size: 44px;
`;