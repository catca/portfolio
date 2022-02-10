import React, { Dispatch, SetStateAction, useEffect } from "react";
import styled from "@emotion/styled";
import state from "../../lib/store";

const header = [
  { title: '소개', current: 1 },
  { title: '기술', current: 2 },
  { title: '프로젝트', current: 3 },
  { title: '마침', current: 4 }
]

type headerProps = {
  setCurrentPage: (value: number) => void;
}

const Header: React.FC<headerProps> = ({ setCurrentPage }) => {
  const onClick = (current: number) => {
    console.log((current - 1) * window.innerHeight);
    setCurrentPage(current);
  }
  return (
    <Container>
      {header.map(({ title, current }, index) => {
        return (
          <Nav key={index} current={current} page={state.page.current} onClick={() => onClick(current)}>{title}</Nav>
        )
      })}
    </Container>
  )
}

export default Header;

interface containerProps {
  page: number | unknown;
  current: number;
}

const Container = styled.header`
  position: fixed;
  height: 54px;
  width: 100vw;
  display: flex;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  background-color: rgba(0, 0, 0, 0);
  z-index: 12;
`;

const Nav = styled.div<containerProps>`
  font-size: 14px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #FFFFFF;
  cursor: pointer;
  border-bottom: ${({ page, current }) => page === current ? 'solid 1px #FFFFFF' : 'none'};
`;