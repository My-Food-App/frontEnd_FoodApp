import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function Filter(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M20.021 3H3.98a2.104 2.104 0 00-1.557 3.518l6.953 7.646v7.211a.75.75 0 001.219.585L12 20.835l2.344-1.875a.75.75 0 00.28-.585v-4.211l6.953-7.646A2.103 2.103 0 0020.021 3z"
        fill="#7D8FAB"
      />
    </Svg>
  )
}