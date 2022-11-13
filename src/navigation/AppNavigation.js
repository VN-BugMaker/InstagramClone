import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import { AuthContext } from '../context/AuthContext';
import Login from '../components/screens/Login';

const AppNavigation = () => {
  const { isLoading, userToken } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {isLoading ? (
        <View
          styles={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator color={'#000'} size={'large'} />
        </View>
      ) : null}
      {userToken === null ? <Login /> : <AppStack />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default AppNavigation;
