import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { DismissKeyboardView, Header, Container } from "../components";
import { ScrollView } from "react-native-gesture-handler";

export function Authentication({children}) {
    return (
        <DismissKeyboardView>
            <ScrollView style={styles.container}>
                <Header/>
                <Container>
                    {children}
                </Container>
            </ScrollView>
        </DismissKeyboardView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 180,
        backgroundColor: '#86C3D7'
    }
})
