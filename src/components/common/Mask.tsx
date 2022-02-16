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
    if (count === 102) {
      counter(0, 2500);
    }
  }, [count]);
  
  return (
    <div className={'svgWrapper'}>
      {/* <svg style={{width: '100%', height: '100%'}}>
        <defs>
          <clipPath id="myClip">
            <circle cx="50%" cy="50%" r={`${state * 0.04}%`} />
          </clipPath>
        </defs>
      </svg> */}
      {/* <svg id="레이어_1" data-name="레이어 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 3840 2160">
        <defs><linearGradient id="무제_그라디언트_12" x1="1920.15" y1="890.08" x2="1920.15" y2="1185.96" gradientUnits="userSpaceOnUse">
          <stop offset="0" stop-color="#004d97" /><stop offset="0.52" stop-color="#003f7c" />
          <stop offset="1" stop-color="#003568" />
        </linearGradient></defs><title>대지 1</title>
        <rect className="cls-1" width="3840" height="2160" />
        <path className="cls-2" d="M2026,977.7h122.48a5.69,5.69,0,0,0,5.69-5.69V903.72a5.69,5.69,0,0,0-5.69-5.69H1988.25a9.11,9.11,0,0,0-6.58,2.82l-44.72,47-44.72-47a9.08,9.08,0,0,0-6.58-2.82H1737.42a9.12,9.12,0,0,0-6.59,2.83l-42.19,44.47a9.1,9.1,0,0,0-2.49,6.25v191.61a5.68,5.68,0,0,0,5.68,5.69h68.3a5.68,5.68,0,0,0,5.68-5.69v-155a9.38,9.38,0,0,1,9.38-9.38H1848a9.38,9.38,0,0,1,9.38,9.38v155a5.68,5.68,0,0,0,5.68,5.69h68.3a5.68,5.68,0,0,0,5.68-5.69v-44l44.69,46.89a9.07,9.07,0,0,0,6.57,2.82h160.21a5.69,5.69,0,0,0,5.69-5.69V1074.9a5.69,5.69,0,0,0-5.69-5.69H2026a9.38,9.38,0,0,1-9.38-9.38V987.08A9.38,9.38,0,0,1,2026,977.7Z" />
      </svg> */}
    </div>
  )
}

export default Mask;
