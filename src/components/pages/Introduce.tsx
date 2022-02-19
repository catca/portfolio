/* eslint-disable no-extend-native */
import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import TypingText from "../common/TypingText";

const Introduce = ({count}: {count: number}) => {
  
  return (
    <Conatiner>
      <Title>
        {
          count > 125 && <TypingText typingText={'인터렉티브한 웹사이트를 사랑하는'} />
        }
      </Title>
      <Title>
        {
          count === 200 && <TypingText typingText={'프론트엔드 개발자 김동균입니다.'} />
        }
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

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-of-type {
    margin-bottom: 16px;
  }
`;