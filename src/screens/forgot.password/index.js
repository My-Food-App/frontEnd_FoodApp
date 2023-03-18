import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Input, Button, Title, Description } from "../../components";
import { Authentication } from "../../layouts";

import { COLOR } from "../../constants";
import { User, Key } from "../../icons";
export function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('');
    const handleForgotPassword = () => {
        console.log(password);
    }
    const handleRegister = () => {
        navigation.navigate("Register")
    }
    const handleLogin = () => {
        navigation.navigate("Login")
    }
    return (
        <Authentication>
            <Title>Lấy lại tài khoản</Title>
            <Description>Vui lòng nhập email đã đăng ký tài khoản của bạn!</Description>
            <Input onChangeText={setEmail} icon={<Key/>} style={styles.email} placeholder="example@gmail.com"></Input>
            <Button onPress={handleForgotPassword} style={styles.btnConfirm} dark>Xác nhận</Button>
            <View style={styles.container}>
                <Description style={styles.textCenter}>Bạn muốn đăng nhập lại?</Description>
                <Button style={styles.btnConfirm} onPress={handleLogin}>Đăng nhập</Button>
                <Description style={styles.textCenter}>Bạn muốn đăng ký tài khoản mới?</Description>
                <Button style={styles.btnConfirm} onPress={handleRegister} >Đăng ký</Button>
            </View>
        </Authentication>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    email: {
        marginTop: 10,
    },
    btnConfirm: {
        marginTop: 6,
    },
    textCenter: {
        marginTop: 15,
        textAlign: 'center'
    }
})