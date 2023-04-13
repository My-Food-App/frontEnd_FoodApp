import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Input, Button, Title, Description } from "../../components";
import { Authentication } from "../../layouts";
import { User, Key, Mail } from "../../icons";
import { COLOR } from "../../constants";
import {register} from "../../api";

export function Register({ navigation }) {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [created_date, setCreated_date] = useState('1/1/2022');
    const handleRegister = async () => {
        await register({username,password,email,created_date,fullName,phoneNumber,navigation})
        console.log(username);
        console.log(email);
        console.log(password);
        console.log(phoneNumber);
        console.log(fullName);
       
    }
    const handleLogin = async () => {
       
        navigation.navigate("Login");
    }
    return (
        <Authentication>
            <Title>Tạo tài khoản mới</Title>
            <Description>Vui lòng nhập tên của bạn, email và mật khẩu để tạo tài khoản mới!</Description>
            <Input onChangeText={setUsername} style={styles.username} icon={<User/>} placeholder="User Name"/>
            <Input onChangeText={setFullName} style={styles.fullName} icon={<User/>} placeholder="Full Name"/>
            <Input onChangeText={setEmail} style={styles.email} icon={<Mail/>} placeholder="Email"/>
            <Input onChangeText={setPassword} style={styles.password} icon={<Key/>} secureTextEntry placeholder="Password"/>
            <Input onChangeText={setPhoneNumber} style={styles.phoneNumber} icon={<Key/>} placeholder="Phone number"/>
            <Button dark style={styles.register} onPress={handleRegister}>đăng ký</Button>
            <View style={styles.containerPrivace}>
                <Text style={styles.acceptRule}>Bằng cách nhấn vào “ĐĂNG KÝ” bạn chấp nhận </Text>
                <TouchableOpacity style={styles.containerTermAndPrivace}>
                    <Text style={styles.termAndPrivace}>điều khoản </Text>
                </TouchableOpacity>
                <Text style={styles.span}>và </Text>
                <TouchableOpacity style={styles.containerTermAndPrivace}>
                    <Text style={styles.termAndPrivace}>dịch vụ </Text>
                </TouchableOpacity>
                <Text style={styles.span}>của chúng tôi.</Text>
            </View>
            <View style={styles.haveAccount}>
                <Text style={styles.textHaveAccount}>Bạn đã có tài khoản?</Text>
            </View>
            <Button onPress={handleLogin}>Đăng nhập</Button>
        </Authentication>
    )
}

const styles = StyleSheet.create({
    descriptionForm: {
        fontSize: 12,
        color:'#7D8FAB'
    },
    username: {
        marginTop: 10
    },
    fullName: {
        marginTop: 10
    },
    email: {
        marginTop: 10
    },
    password: {
        marginTop: 10
    },
    phoneNumber: {
        marginTop: 10
    },
    register: {
        marginTop: 8, 
        marginBottom: 18
    },
    haveAccount: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        marginBottom: 10,
        paddingTop: 5,
    },
    containerPrivace: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap',
        alignContent: 'center',
        alignItems: 'center'
    },
    textHaveAccount: {
        color: '#7D8FAB'
    },
    acceptRule: {
        paddingTop: 5,
        color: '#7D8FAB',
        fontSize: 13,
        fontWeight: '300'
    },
    containerTermAndPrivace: {
        paddingTop: 5
    },
    termAndPrivace: {
        fontWeight: '700',
        color: COLOR.SOFT 
    },
    span: {
        paddingTop: 5,
        color: COLOR.SOFT
    }
})
