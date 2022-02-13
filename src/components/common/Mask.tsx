import React, { useEffect, useState } from "react";

const Mask = ({ count }: {count: number}) => {
  const [state, setState] = useState<number>(0);
  const counter = (minimum: number, maximum: number) => {
    for (let count = minimum; count <= maximum; count++) {
      setTimeout(() => {
        setState(count);
      }, 300);
    }
  }
  useEffect(() => {
    if (count == 101) {
      counter(0, 2500);
    }
  }, [count]);
  
  return (
    <div className={'svgWrapper'}>
      <svg style={{width: '100%', height: '100%'}}>
        <defs>
          <clipPath id="myClip">
            <circle cx="50%" cy="50%" r={`${state * 0.04}%`} />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export default Mask;
