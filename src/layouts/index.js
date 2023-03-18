import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { DismissKeyboardView, Header, Container } from "../components";

export function Authentication({children}) {
    return (
        <DismissKeyboardView>
            <SafeAreaView style={styles.container}>
                <Header/>
                <Container>
                    {children}
                </Container>
            </SafeAreaView>
        </DismissKeyboardView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 180,
        backgroundColor: '#86C3D7'
    }
})
