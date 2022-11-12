import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [fontsLoaded] = useFonts({
        'Lobster-Regular': require('../../../assets/fonts/Lobster-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return null;
    }

    const loginPress = () => {
        axios.post('http://192.168.0.38:5000/api/login', {
            email,
            password
        }).then(async res => {
            await AsyncStorage.setItem('access_token', res.data.access_token)
            navigation.navigate('Bottom')
            console.log("call success");

        }).catch(err => {
            alert('User or fail')
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Instagram</Text>
            <TextInput
                style={styles.txtInput}
                onChangeText={(email) => setEmail(email)}
                placeholder={'Số điện thoại, email hoặc tên người dùng'}
                autoCapitalize='none'
            />
            <TextInput
                style={styles.txtInput}
                onChangeText={(pass) => setPassword(pass)}
                placeholder={'Mật khẩu'}
            />
            <TouchableOpacity
                onPress={() => loginPress()}
                style={styles.btnLogin}
            >
                <Text style={styles.txtlogin}>Log in</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    txtInput: {
        backgroundColor: '#FAFAFA',
        width: '92%',
        height: 44,
        paddingHorizontal: 10,
        marginTop: 12,
        borderRadius: 5
    },
    btnLogin: {
        width: '92%',
        backgroundColor: '#3797EF',
        height: 44,
        marginTop: 68,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    txtlogin: {
        color: '#ffffff',
        fontSize: 17,
    },
    logo: {
        fontFamily: "Lobster-Regular",
        fontSize: 49,
        fontWeight: '500'
    }
})

export default Login
