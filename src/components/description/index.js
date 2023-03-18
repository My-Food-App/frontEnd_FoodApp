import React from "react";
import { Text, StyleSheet } from "react-native";
import { COLOR } from "../../constants";
export function Description({children, style}) {
    return (
        <Text style={{...styles.title, ...style}}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 12,
        color: COLOR.SOFT,
    }
})