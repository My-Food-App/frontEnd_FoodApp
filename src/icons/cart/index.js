import React from "react"
import Svg, { Path, Rect, G, Circle, Defs, ClipPath } from "react-native-svg"

export function Cart(props) {
  return (
    <Svg
      width={75}
      height={63}
      viewBox="0 0 75 63"
      fill="none"
      {...props}
    >
      <Path fill="#fff" d="M0 0H75V63H0z" />
      <Rect x={8} width={63} height={63} rx={31.5} fill="#027335" />
      <G clipPath="url(#clip0_323_22)" fill="#fff">
        <Path d="M44.178 37.844a2.791 2.791 0 102.788 2.794v-.003a2.794 2.794 0 00-2.788-2.79zM49.128 24.48a1.077 1.077 0 00-.203-.02H31.932l-.27-1.8a2.422 2.422 0 00-2.397-2.086h-2.188a1.077 1.077 0 100 2.153h2.19a.27.27 0 01.27.237l1.657 11.363a2.977 2.977 0 002.931 2.513h11.2a2.96 2.96 0 002.903-2.365l1.752-8.734a1.077 1.077 0 00-.852-1.261zM37.34 40.516a2.791 2.791 0 00-2.798-2.669 2.79 2.79 0 00.065 5.58h.067a2.791 2.791 0 002.666-2.911z" />
      </G>
      <Circle
        cx={50}
        cy={25}
        r={6}
        fill="#FFA902"
        stroke="#027335"
        strokeWidth={2}
      />
      <Defs>
        <ClipPath id="clip0_323_22">
          <Path fill="#fff" transform="translate(26 20)" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}