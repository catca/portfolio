/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-extend-native */
import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';
import { css } from "@emotion/react";

const toKorChars = (str: string) => {
  var cCho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'],
    // cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ], 
    cJong = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'], cho, jung, jong;
  var cnt = str.length,
    chars = [],
    cCode;
  for (var i = 0; i < cnt; i++) {
    cCode = str.charCodeAt(i);
    // 한글이 아닌 경우 
    if (cCode === 32) {
      chars.push(" ");
      continue;
    }
    if (cCode < 0xAC00 || cCode > 0xD7A3) {
      chars.push(str.charAt(i)); continue;
    }
    cCode = str.charCodeAt(i) - 0xAC00;
    // 종성 
    jong = cCode % 28;
    // 중성 
    jung = ((cCode - jong) / 28) % 21
    // 초성 
    cho = (((cCode - jong) / 28) - jung) / 21

    // 테스트라는 문장이 있으면 ㅌ테ㅅ스ㅌ트 형식으로 저장되도록함 (타이핑을 위해서)
    chars.push(cCho[cho]);
    chars.push(String.fromCharCode(44032 + (cho * 588) + (jung * 28)));
    if (cJong[jong] !== '') {
      chars.push(String.fromCharCode(44032 + (cho * 588) + (jung * 28) + jong));
    }
  }
  return chars;
}

const TypingText = ({ typingText }: { typingText: string[] }) => {
  const [content, setContent] = useState<string[]>([]);
  const [contentRaw, setContentRaw] = useState<number>(0);

  const typingLength = typingText.length;
  let typing: any = [];
  let resultSplit = []; // 한글자씩자름
  let text = "";
  let i = 0;
  let j = 0;
  let imax = typing.length;
  let timer: NodeJS.Timer;

  function startTimer() {
    timer = setInterval(function () {
      typi();
    }, 70)
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function typi() {
    if (i <= imax - 1) {
      //각 글자가 초성 중성 종성 순서대로 추가되도록 
      var jmax = typing[i].length; //ㅇ아안 ㄴ녀녕 ㅎ하
      let newArr = [...content];
      newArr[contentRaw] = text + typing[i][j];
      setContent(newArr);
      j++;
      if (j === jmax) {
        text += typing[i][j - 1];//초성중성종성 순서대로 출력된 글자는 저장 ( 다음 글자와 이어붙이기 위해서 )
        i++;
        j = 0;
      }
    } else {
      stopTimer();
      setContentRaw((props) => props + 1);
    }
  }


  useEffect(() => {
    if (contentRaw === typingLength) { return; }

    typing.length = 0;
    resultSplit = typingText[contentRaw].split('');
    //각글자 초성,중성,종성으로 나눔
    for (let x = 0; x < resultSplit.length; x++) {
      typing[x] = toKorChars(resultSplit[x]);
    }
    text = "";
    i = 0;
    j = 0;
    imax = typing.length;
    startTimer();
  }, [contentRaw]);

  return (
    <Container>
      {content.map((contents, index) => {
        return (
          <Content key={index}>
            {contents.split('').map((content, index) => {
              if (content === '.' || content === ',') {
                return <SpanLeft key={index}>{content}</SpanLeft>
              } else if ((content === '사' && index === 0) || content === '랑') {
                return <SpanRed key={index}>{content}</SpanRed>
              } else if (content === '김' || content === '동' || content === '균') {
                return <SpanMint key={index}>{content}</SpanMint>
              } else {
                return <Span key={index}>{content}</Span>
              }
            })}
          </Content>
        )
      })}
    </Container>
  );
}

export default React.memo(TypingText);

const SpanCss = css`
  display: inline-block;
  font-size: 24px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  width: 30px;
  height: 30px;
  padding: 5px;
  text-align: center;
  line-height: 120%;
`;

const Span = styled.span`
  ${SpanCss}
`;

const SpanLeft = styled.span`
  ${SpanCss}
  text-align: left;
`;

const SpanRed = styled.span`
  ${SpanCss}
  color: #df3567;
`;

const SpanMint = styled.span`
  ${SpanCss}
  color: #5CFFD1;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  &:not(:last-of-type) {
    margin-bottom: 12px;
  }
`;