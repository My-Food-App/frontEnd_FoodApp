import React from "react";
import { Text, StyleSheet } from "react-native";
export function Title({children}) {
    return (
        <Text style={styles.title}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: '800',
        paddingBottom: 8,
    }
})