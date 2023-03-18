import React from "react";
import Svg, { Path } from "react-native-svg"

export function Key(props) {
    return (
      <Svg
        width={14}
        height={20}
        viewBox="0 0 14 20"
        fill="none"
        {...props}
      >
        <Path
          d="M13 6h-1V3a3 3 0 00-3-3H5a3 3 0 00-3 3v3H1a1 1 0 00-1 1v8a5 5 0 005 5h4a5 5 0 005-5V7a1 1 0 00-1-1zM4 3a1 1 0 011-1h4a1 1 0 011 1v3H4V3zm4 10.72V15a1 1 0 11-2 0v-1.28A2 2 0 015 12a2 2 0 014 0 2 2 0 01-1 1.72z"
          fill="#7D8FAB"
        />
      </Svg>
    )
}