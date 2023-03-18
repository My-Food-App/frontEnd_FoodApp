import React, { useState,useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Input, Button, Title, Description } from "../../components";
import { Authentication } from "../../layouts";
import { User, Key } from "../../icons";
import {confirmAccount} from "../../api";
export function ConfirmAccount({ route,navigation }) {
    const [email, setEmail] = useState('');
    useEffect(() => {
        let { email } = route.params;
        setEmail(email)
    }, [email])
    const [code, setCode] = useState('');
    const handleConfirmAccount = async () => {
        console.log(code);
        console.log(email);
        await confirmAccount({code,email})
        navigation.navigate("Login")
    }
    const handleRegister = () => {
        navigation.navigate("Register")
    }
    const handleLogin = () => {
        navigation.navigate("Login")
    }
    if(email){
        return (
            <Authentication>
                <Title>Nhập mã xác thực</Title>
                <Description>Chúng tôi đã gửi mã xác thực đến email của bạn, vui lòng kiểm tra hộp thư và nhập mã xác thực</Description>
                <Input onChangeText={setCode} icon={<Key/>} style={styles.code} placeholder="123456" secureTextEntry></Input>
                <Button onPress={handleConfirmAccount} style={styles.btnConfirm} dark>Xác nhận</Button>
                <View style={styles.container}>
                    <Description style={styles.textCenter}>Bạn muốn đăng nhập lại?</Description>
                    <Button style={styles.btnConfirm} onPress={handleLogin}>Đăng nhập</Button>
                    <Description style={styles.textCenter}>Bạn muốn đăng ký tài khoản mới?</Description>
                    <Button style={styles.btnConfirm} onPress={handleRegister} >Đăng ký</Button>
                </View>
            </Authentication>
        )
    }
    else {
        return <></>
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    code: {
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