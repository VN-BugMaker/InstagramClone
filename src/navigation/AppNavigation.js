import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import { AuthContext } from '../context/AuthContext';
import Login from '../components/screens/Login';
import SocketClient from '../socket/SocketClient';

const AppNavigation = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={'#999999'} size={'large'} />
        </View>
      ) : userToken === null ? (
        <Login />
      ) : (
        <View style={styles.main}>
          <AppStack />
          <SocketClient />
        </View>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center'
  },
  main: { flex: 1 }
});

export default AppNavigation;
