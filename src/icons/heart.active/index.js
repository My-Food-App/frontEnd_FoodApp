import React from "react";
import Svg, { Path } from "react-native-svg"

export function HeartActive(props) {
    return (
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          {...props}
        >
          <Path
            d="M21.403 5.589a5.65 5.65 0 00-4.642-2.2 5.427 5.427 0 00-4.385 2.397c-.13.193-.256.392-.376.596-.12-.204-.246-.403-.376-.596A5.427 5.427 0 007.24 3.39a5.668 5.668 0 00-4.642 2.2c-1.522 1.984-1.457 4.738.165 7.018 2.953 4.148 8.793 7.797 9.04 7.95a.375.375 0 00.396 0c.247-.153 6.087-3.802 9.04-7.95 1.622-2.28 1.687-5.034.165-7.018z"
            fill="#FF6464"
          />
        </Svg>
      )
}