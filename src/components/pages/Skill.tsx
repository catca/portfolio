import React from "react";
import styled from '@emotion/styled';
import { FrontStatus, LibraryNBackStatus } from "../svg/Status";

const Skill = () => {
  return (
    <Conatiner>
      <div>
        <Title>Front skill</Title>
        <FrontStatus />
      </div>
      {/* <div>
        <Title>library & Back skill</Title>
        <LibraryNBackStatus />
      </div> */}
    </Conatiner>
  );
}

export default React.memo(Skill);

const Conatiner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  & > div:first-of-type {
    // margin-right: 36px;
    & > div {
      color: #5CFFD1;
    }
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: 600;
  color: #78d7ff;
`;
