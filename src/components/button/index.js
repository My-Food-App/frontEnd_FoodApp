import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLOR } from "../../constants"
export function Button({children, onPress, dark, style, textStyle}) {
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.containerButton, ...(dark ? styles.containerButtonDark: styles.containerButtonLight),...style}}>
            <Text style={{...styles.button, ...(dark ? styles.buttonDark: styles.buttonLight),...textStyle}}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerButton: {
        height: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    containerButtonDark: {
        backgroundColor: COLOR.MAIN,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowColor: COLOR.MAIN,
        shadowOpacity: 5,
        shadowRadius: 12
    },
    containerButtonLight: {
        borderColor: COLOR.SOFT,
        borderWidth: 1,
    },
    button: {
        fontSize: 18,
        fontWeight: '700',
    },
    buttonDark: {
        color: COLOR.WHITE,
        textTransform: 'uppercase',
    },
    buttonLight: {
        color:COLOR.SOFT,
        textTransform: 'uppercase'
    }
})