import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState, useContext } from 'react';
import { useFonts } from 'expo-font';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [fontsLoaded] = useFonts({
    'Lobster-Regular': require('../../../assets/fonts/Lobster-Regular.ttf')
  });
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Instagram</Text>
      <TextInput
        style={styles.txtInput}
        onChangeText={(email) => setEmail(email)}
        placeholder={'Số điện thoại, email hoặc tên người dùng'}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.txtInput}
        onChangeText={(pass) => setPassword(pass)}
        placeholder={'Mật khẩu'}
        secureTextEntry={true}
        autoCapitalize="none"
      />
      <TouchableOpacity
        onPress={() => login({ email, password })}
        style={styles.btnLogin}
      >
        <Text style={styles.txtlogin}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
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
    fontSize: 17
  },
  logo: {
    fontFamily: 'Lobster-Regular',
    fontSize: 49,
    fontWeight: '500'
  }
});

export default Login;
