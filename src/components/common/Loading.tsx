import React, { Dispatch, SetStateAction } from "react";
import '../../styles/Loading.css';
import useInterval from "../../lib/hooks";

const Loading = ({ count, setCount }: { count: number, setCount: Dispatch<SetStateAction<number>> }) => {
  useInterval(() => {
    setCount(count + 1);
  }, count < 101 ? 50 : null);
  
  return (
    <>
      {count < 101 && <div className="alfa">
        <div className="mov">
          <div className="frente">
            <p id="pp">{`${count}%`}</p>
          </div>
          <div className="tras">
          </div>
          <div className="meio">
          </div>
        </div>
      </div>
      }
    </>
  )
}

export default Loading;
