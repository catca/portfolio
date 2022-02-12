import React, { useRef, useEffect } from "react";
import styled from '@emotion/styled';

const Introduce = () => {
  return (
    <Conatiner>
      <H1>
        인터렉티브한 웹사이트를 사랑하는
      </H1>
      <Title>
        프론트엔드 개발자 김동균입니다.
      </Title>
    </Conatiner>
  );
}

export default React.memo(Introduce);

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