import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function DoubleArrow(props) {
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
        d="M23.56 6.622l-4.06 4.06a1.495 1.495 0 01-2.121 0 1.5 1.5 0 010-2.12l1.5-1.5H3.152a1.5 1.5 0 010-3H18.88l-1.5-1.501A1.5 1.5 0 1119.498.44l4.062 4.06a1.5 1.5 0 010 2.122zm-3.533 10.317H5.121l1.5-1.5a1.5 1.5 0 00-2.12-2.121l-4.062 4.06a1.5 1.5 0 000 2.122L4.5 23.56a1.495 1.495 0 002.121 0 1.5 1.5 0 000-2.12l-1.5-1.5h14.906a1.5 1.5 0 100-3z"
        fill="#7D8FAB"
      />
    </Svg>
  )
}
