import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function Bell(props) {
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
        d="M21.857 17.486C20.073 14.51 19 13.212 19 10a7.005 7.005 0 00-6-6.925V3a1 1 0 10-2 0v.08a7.372 7.372 0 00-6 7.172c0 2.96-1.262 4.574-2.857 7.234A1 1 0 003 19h18a1 1 0 00.857-1.514zM14 20h-4a1 1 0 000 2h4a1 1 0 100-2z"
        fill="#fff"
      />
    </Svg>
  )
}


