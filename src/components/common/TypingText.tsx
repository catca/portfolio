/* eslint-disable no-extend-native */
import React, { useEffect, useState } from "react";
import styled from '@emotion/styled';

const toKorChars = (str: string) => { 
  var cCho = [ 'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ], 
      // cJung = [ 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ' ], 
      cJong = [ '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ' ], cho, jung, jong; 
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
    jung = ((cCode - jong) / 28 ) % 21 
    // 초성 
    cho = (((cCode - jong) / 28 ) - jung ) / 21 

    // 테스트라는 문장이 있으면 ㅌ테ㅅ스ㅌ트 형식으로 저장되도록함 (타이핑을 위해서)
    chars.push(cCho[cho]);
    chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28)));
    if (cJong[jong] !== '') { 
      chars.push(String.fromCharCode( 44032 + (cho * 588) + (jung  * 28) + jong ));
    }
  }
  return chars; 
}

const TypingText = ({ typingText }: {typingText: string}) => {
  const [title, setTItle] = useState<string>('');

  useEffect(() => {
    // 타이핑할 문장
    let typing: any = [];
    const resultSplit = typingText.split(''); // 한글자씩자름

    //각글자 초성,중성,종성으로 나눔
    for(let x = 0; x < resultSplit.length; x++) {
      typing[x] = toKorChars(resultSplit[x]);
    }

    let text = "";
    let i = 0;
    let j = 0;
    let imax = typing.length;
    let timer: NodeJS.Timer;

    function startTimer() {
      timer = setInterval(function () {
        typi();
      }, 100)
    }

    function stopTimer() {
      clearInterval(timer);
    }

    function typi() {
      if(i <= imax - 1) {
        //각 글자가 초성 중성 종성 순서대로 추가되도록 
        var jmax = typing[i].length;
        setTItle(text + typing[i][j]);
        j++;
        if(j === jmax){
          text += typing[i][j-1];//초성중성종성 순서대로 출력된 글자는 저장 ( 다음 글자와 이어붙이기 위해서 )
          i++;
          j=0;
        }
      } else {
        stopTimer();
      }
    }
    startTimer();
  }, [])
  return (
    <Container>
      {title.split('').map((title: string) => {
        return <Span>{title}</Span>
      })}
    </Container>
  );
}

export default React.memo(TypingText);

const Span = styled.span`
  display: inline-block;
  font-size: 24px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  width: 30px;
  height: 30px;
  padding: 5px;
  text-align: center;
  line-height: 120%;
  &:last-of-type{
    text-align: left;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;