import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function Home(props) {
  return (
    <Svg
      width={22}
      height={22}
      viewBox="0 0 22 22"
      fill="none"
      {...props}
    >
      <Path
        d="M21.44 10.79a.75.75 0 01-.69.464H18.5v7.5a2.25 2.25 0 01-2.25 2.25h-3a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-1.5a.75.75 0 00-.75.75v4.5a.75.75 0 01-.75.75h-3a2.25 2.25 0 01-2.25-2.25v-7.5H1.25a.75.75 0 01-.69-.465.75.75 0 01.157-.817l9.75-9.75a.75.75 0 011.066 0l9.75 9.75a.75.75 0 01.157.817z"
        fill="#027335"
      />
    </Svg>
  )
}