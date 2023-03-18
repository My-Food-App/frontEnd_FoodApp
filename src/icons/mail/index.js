import React from "react";
import Svg, { Path } from "react-native-svg"

export function Mail(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M19.34 4.462A2.303 2.303 0 0017.07 2.5H2.93A2.302 2.302 0 00.66 4.462L10 10.506l9.34-6.044z"
        fill="#7D8FAB"
      />
      <Path
        d="M10.34 11.775a.625.625 0 01-.68 0L.626 5.929v9.265A2.308 2.308 0 002.931 17.5h14.138a2.309 2.309 0 002.306-2.306V5.928l-9.036 5.847z"
        fill="#7D8FAB"
      />
    </Svg>
  )
}