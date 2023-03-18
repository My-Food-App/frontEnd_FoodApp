import React from "react";
import { Platform, TouchableWithoutFeedback, Keyboard } from "react-native";

export function DismissKeyboardView({children}) {
   
    return Platform.OS === 'ios' ? ( 
        <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
            {children}
        </TouchableWithoutFeedback >
    ): (
        <>
            {children}
        </>
    )
}