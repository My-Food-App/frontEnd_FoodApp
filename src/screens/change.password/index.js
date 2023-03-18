import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Input, Button, Title, Description } from "../../components";
import { Authentication } from "../../layouts";

import { COLOR } from "../../constants";
import { User, Key } from "../../icons";
export function ChangePassword({ navigation }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleConfirm = () => {
        console.log(username);
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
            <Title>Đặt lại mật khẩu mới</Title>
            <Description>Vui lòng đặt lại mật khẩu mới! Mật khẩu mới yêu cầu được tạo bằng 8 ký tự trở lên, bao gồm chữ Hoa, chữ thường, số và ký tự dấu chấm.</Description>
            <Input onChangeText={setPassword} icon={<Key/>} style={styles.newPassword} placeholder="Mật khẩu mới" secureTextEntry></Input>
            <Input onChangeText={setConfirmPassword} icon={<Key/>} style={styles.confirmNewPassword} placeholder="Nhập lại mật khẩu mới" secureTextEntry></Input>
            <Button onPress={handleConfirm} style={styles.btnConfirm} dark>Xác nhận</Button>
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
    newPassword: {
        marginTop: 10,
    },
    confirmNewPassword: {
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