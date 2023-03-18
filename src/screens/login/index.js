import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Input, Button, Title, Description } from "../../components";
import { Authentication } from "../../layouts";

import { COLOR } from "../../constants";
import { User, Key } from "../../icons";
import { login } from "../../api";
export function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        console.log(username);
        console.log(password);
        await login({username, password})
        navigation.navigate("Tabs")
    }
    const handleRegister = () => {
        navigation.navigate("Register")
    }
    return (
        <Authentication>
            <Title>Chào mừng bạn trở lại</Title>
            <Description>Vui lòng nhập tên người dùng và mật khẩu để tiếp tục!</Description>
            <Input onChangeText={setUsername} style={{marginTop: 25}} icon={<User/>} placeholder="Username"/>
            <Input onChangeText={setPassword} style={{marginTop: 10}} icon={<Key/>} secureTextEntry placeholder="Password"/>
            <Button style={{marginTop: 20, marginBottom: 30}} dark onPress={handleLogin}>đăng nhập</Button>
            <View style={styles.containerFooter}>
                <View>
                    <Text>Giữ đăng nhập</Text>
                </View>
                <Pressable
                    onPress={() =>{
                        navigation.navigate("ForgotPassword")
                    }}
                >
                    <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                </Pressable>
            </View>
            <Text style={styles.textNotAccount}>Bạn chưa có tài khoản?</Text>
            <Button onPress={handleRegister}>
                Tạo tài khoản
            </Button>
            
        </Authentication>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        backgroundColor: '#86C3D7'
    },
    containerLogin: {
        paddingTop: 30,
        paddingLeft: 15,
        paddingRight: 15
    },
    wrapperLogin: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    containerFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    forgotPassword: {
        fontSize: 14,
        fontWeight: "400",
        color: COLOR.MAIN,
        textDecorationLine: 'underline'
    },
    textNotAccount: {
        marginBottom: 15,
        marginTop: 35,
        color: COLOR.SOFT,
        textAlign: 'center'
    }
})
