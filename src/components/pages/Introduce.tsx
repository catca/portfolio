/* eslint-disable no-extend-native */
import React from "react";
import styled from '@emotion/styled';
import TypingText from "../common/TypingText";

const Introduce = ({ count }: { count: number }) => {
  const typingText = '인터렉티브한\n웹사이트를\n사랑하는\n프론트엔드 개발자\n김동균입니다.'
  return (
    <Conatiner>
      {count > 132 && <TypingText typingText={typingText.split('\n')} />}
    </Conatiner>
  );
}

export default React.memo(Introduce);

const Conatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 720px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:first-of-type {
    margin-bottom: 16px;
  }
`;