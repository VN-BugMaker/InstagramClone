import { StyleSheet, Text, View } from 'react-native';
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL } from '../components/screenComponents/api/Url';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [avatarUser, setAvatarUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const login = ({ email, password }) => {
    setIsLoading(true);
    axios
      .post(`${URL}/api/login`, {
        email,
        password
      })
      .then((res) => {
        AsyncStorage.setItem('access_token', res.data.access_token);
        AsyncStorage.setItem('idUser', res.data.user._id);
        AsyncStorage.setItem('avatarUser', res.data.user.avatar);
        AsyncStorage.setItem('username', res.data.user.username);
        setIdUser(res.data.user._id);
        setUserToken(res.data.access_token);
        setAvatarUser(res.data.user.avatar);
        setUsername(res.data.user.username);
        isLoggedIn();
      })
      .catch((err) => {
        alert('User or fail');
      });
    setIsLoading(false);
  };
  const logout = () => {
    setUserToken(null);
    AsyncStorage.removeItem('access_token');
    AsyncStorage.removeItem('idUser');
    AsyncStorage.removeItem('avatarUser');
    AsyncStorage.removeItem('username');
    setIsLoading(false);
  };
  const isLoggedIn = async () => {
    setIsLoading(true);
    try {
      const userToken = await AsyncStorage.getItem('access_token');
      const idUser = await AsyncStorage.getItem('idUser');
      const avatar = await AsyncStorage.getItem('avatarUser');
      const username = await AsyncStorage.getItem('username');
      setIdUser(idUser);
      setUserToken(userToken);
      setAvatarUser(avatar);
      setUsername(username);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isLoading,
        username,
        userToken,
        avatarUser,
        idUser,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
