import React from "react";
import Svg, { Path } from "react-native-svg"

export function User(props) {
  return (
    <Svg
      width={16}
      height={21}
      viewBox="0 0 16 21"
      fill="none"
      {...props}
    >
      <Path
        d="M8 7.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zM15.5 16.75v1.5a.775.775 0 01-.217.532C13.61 20.456 8.57 20.5 8 20.5c-.57 0-5.61-.045-7.282-1.718A.775.775 0 01.5 18.25v-1.5a7.5 7.5 0 0115 0z"
        fill="#7D8FAB"
      />
    </Svg>
  )
}