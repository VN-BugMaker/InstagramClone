import { StyleSheet } from 'react-native';
import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator
} from '@react-navigation/stack';
import Status from '../components/screenComponents/StatusStories';
import FriendProfile from '../components/screenComponents/FriendProfile';
import EditProfile from '../components/screenComponents/EditProfile';
import SettingInformation from '../components/screenComponents/SettingInformation';
import Login from '../components/screens/Login';
import TabNavigator from './TabNavigator';

const AppStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      // initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="MainScreen" component={TabNavigator} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Status" component={Status} />
      <Stack.Screen
        name="FriendProfile"
        component={FriendProfile}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
        }}
      />
      <Stack.Screen name="SettingInformation" component={SettingInformation} />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
