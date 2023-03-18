import React from "react";
import Svg, { Path } from "react-native-svg"

export function Show(props) {
  return (
    <Svg
      width={24}
      height={18}
      viewBox="0 0 24 18"
      fill="none"
      {...props}
    >
      <Path
        d="M12 11.572a2.572 2.572 0 100-5.144 2.572 2.572 0 000 5.144z"
        fill="#86C3D7"
      />
      <Path
        d="M23.925 8.649C21.765 3.805 16.86.427 12 .427 7.14.427 2.236 3.805.075 8.65c-.1.223-.1.479 0 .703 2.16 4.843 7.064 8.22 11.925 8.22 4.86 0 9.764-3.377 11.925-8.22.1-.224.1-.48 0-.703zM12 13.286a4.286 4.286 0 110-8.572 4.286 4.286 0 010 8.572z"
        fill="#86C3D7"
      />
    </Svg>
  )
}