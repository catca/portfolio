import React from "react";
import styled from '@emotion/styled';

const End = () => {
  return (
    <Conatiner>
      <Content>
        <LinkWrapper>
          <div>
            깃허브 링크
          </div>
          <A href={'https://github.com/catca'} target="_blank" rel="noopener noreferrer">
            <img src={'img/github.png'} alt={'github'} width={32} height={32}/>
          </A>
        </LinkWrapper>
        <LinkWrapper>
          <div>
            블로그 링크
          </div>
          <A href={'https://velog.io/@catca'} target="_blank" rel="noopener noreferrer">
            <img src={'img/velog.png'} alt={'velog'} width={32} height={32}/>
          </A>
        </LinkWrapper>
        <LinkWrapper>
          <div>
            캔버스 블로그 링크
          </div>
          <A href={'https://catca.netlify.app'} target="_blank" rel="noopener noreferrer">
            <img src={'img/canvas.png'} alt={'canvas'} width={32} height={32}/>
          </A>
        </LinkWrapper>
        <div>
          봐주셔서 감사합니다.♥
        </div>
      </Content>
    </Conatiner>
  );
}

export default React.memo(End);

const Conatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Content = styled.div`
  width: 220px;
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
`;

const LinkWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  & > div {
    margin-right: 18px;
  }
`;

const A = styled.a`
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
`;