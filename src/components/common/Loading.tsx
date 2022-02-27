import React, { Dispatch, SetStateAction } from "react";
import '../../styles/Loading.css';
import { useInterval } from "../../lib/hooks";
import styled from "@emotion/styled";

const Loading = ({ count, setCount }: { count: number, setCount: Dispatch<SetStateAction<number>> }) => {
  useInterval(() => {
    setCount(count + 1);
  }, count < 133 ? 50 : null);

  return (
    <>
      {count < 110 &&
        <Container>
          <div className="background"></div>
          <svg className="loading" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="270px" height="380px" viewBox="0 0 190 190" enableBackground="new 0 0 190 190" xmlSpace="preserve">
            <defs>
              <pattern id="water" width=".25" height="1.1" patternContentUnits="objectBoundingBox">
                <path fill="#000" d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z" />
              </pattern>
            </defs>
            <rect className="water-fill" mask="url(#text_mask)" fill="url(#water)" x="-400" y="0" width="1600" height="500" />
          </svg>
        </Container >
      }
    </>
  )
}

export default Loading;

const Container = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
`;