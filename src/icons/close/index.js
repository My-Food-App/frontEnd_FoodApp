import * as React from "react"
import Svg, { Path } from "react-native-svg"

export function Close(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M4.706 20.99a1.693 1.693 0 01-1.21-.413 1.74 1.74 0 010-2.432L17.97 3.5a1.691 1.691 0 012.41.08 1.74 1.74 0 01.08 2.266L5.9 20.577c-.331.287-.758.435-1.194.414z"
        fill="#000"
      />
      <Path
        d="M19.165 20.99a1.695 1.695 0 01-1.194-.5L3.496 5.848a1.739 1.739 0 01.186-2.432 1.69 1.69 0 012.218 0l14.56 14.643a1.739 1.739 0 010 2.519 1.692 1.692 0 01-1.296.414z"
        fill="#000"
      />
    </Svg>
  )
}

