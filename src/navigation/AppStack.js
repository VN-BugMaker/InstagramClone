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
import AddPost from '../components/screens/AddPost';
import FollowScreen from '../components/screens/FollowScreen';
import Comments from '../components/screenComponents/Comments';
import Message from '../components/screens/Message';
import MessageDetail from '../components/screenComponents/MessageDetail';
import PostDetail from '../components/screenComponents/PostDetail';

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
      <Stack.Screen
        name="AddPost"
        component={AddPost}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
        }}
      />
      <Stack.Screen
        name="FollowScreen"
        component={FollowScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      />
      <Stack.Screen
        name="Comments"
        component={Comments}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      />
      <Stack.Screen
        name="Message"
        component={Message}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      />
      <Stack.Screen
        name="MessageDetail"
        component={MessageDetail}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
