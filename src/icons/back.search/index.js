import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function BackSearch(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M22 11a1 1 0 00-1 1 9.018 9.018 0 11-3.355-7H16a1 1 0 100 2h4a1 1 0 001-1V2a1 1 0 00-2 0v1.531A10.989 10.989 0 1023 12a1 1 0 00-1-1z"
        fill="#7D8FAB"
      />
      <Path
        d="M12 5a1 1 0 00-1 1v6a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L13 11.586V6a1 1 0 00-1-1z"
        fill="#7D8FAB"
      />
    </Svg>
  )
}

