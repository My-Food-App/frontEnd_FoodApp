import React from "react";
import { View } from "react-native";
import { SafeAreaView, StyleSheet } from "react-native";
import { COLOR } from "../../constants";
export function Container({children}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                {children}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: 700,
        backgroundColor: COLOR.WHITE,
    },
    wrapper: {
       
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15
    }
})