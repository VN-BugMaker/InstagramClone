import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const login = ({ email, password }) => {
    axios
      .post('http://192.168.0.38:5000/api/login', {
        email,
        password
      })
      .then(async (res) => {
        await AsyncStorage.setItem('access_token', res.data.access_token);
        // navigation.navigate('Login');
        setUserToken(res.data.access_token);
        console.log(res.data.access_token);
      })
      .catch((err) => {
        alert('User or fail');
      });
    setIsLoading(false);
  };
  const logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('access_token');
    setIsLoading(false);
  };
  const isLoggedIn = async () => {
    try {
      const userToken = await AsyncStorage.getItem('access_token');
      setUserToken(userToken);
      setIsLoading(false);
      console.log(userToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider value={{ isLoading, userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
