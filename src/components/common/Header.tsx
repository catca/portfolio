import React from "react";
import styled from "@emotion/styled";

const Header = () => {
  return (
    <Container>
      <div>소개</div>
      <div>기술</div>
      <div>프로젝트</div>
      <div>마침</div>
    </Container>
  )
}

export default Header;

const Container = styled.div`
  position: fixed;
  height: 54px;
  width: 100vw;
  display: flex;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  background-color: rgba(0, 0, 0, 0);
  z-index: 12;
  & > div {
    font-size: 14px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    cursor: pointer;
  }
`;