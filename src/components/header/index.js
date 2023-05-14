import React from "react";
import { View, Text, StyleSheet } from "react-native";
export function Header() {
    return (
        <View style={styles.headerContainer}>  
            <Text style={styles.titleHeader}>Food Shop</Text>
            <Text style={styles.descriptionHeader}>Ứng dụng mua hàng uy tính</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 40,
        marginBottom: 25,
    },
    titleHeader: {
        fontSize: 30,
        fontWeight: '900',
        textAlign: 'center',
    },
    descriptionHeader: {
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'center'
    },
})