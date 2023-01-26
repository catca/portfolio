import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectPage, setCurrentPage } from "../../lib/redux/page/pageSlice";
import styled from "@emotion/styled";
import state from "../../lib/store";

const header = [
  { title: "소개", current: 1 },
  { title: "기술", current: 2 },
  { title: "프로젝트", current: 3 },
  { title: "마침", current: 4 },
];

const Header: React.FC = () => {
  const { currentPage } = useSelector(selectPage);
  const dispatch = useDispatch();
  const onClick = (current: number) => {
    dispatch(setCurrentPage(current));
  };
  return (
    <Container>
      {header.map(({ title, current }, index) => {
        return (
          <Nav
            key={index}
            current={current}
            page={currentPage}
            onClick={() => onClick(current)}
          >
            {title}
          </Nav>
        );
      })}
    </Container>
  );
};

export default Header;

interface containerProps {
  page: number;
  current: number;
}

const Container = styled.header`
  position: fixed;
  height: 60px;
  width: 100vw;
  display: flex;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  background-color: rgba(0, 0, 0, 0);
  z-index: 12;
`;

const Nav = styled.div<containerProps>`
  font-size: 16px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  cursor: pointer;
  border-bottom: ${(props: { page: any; current: any }) =>
    props.page === props.current ? "solid 1px #FFFFFF" : "none"};
`;
