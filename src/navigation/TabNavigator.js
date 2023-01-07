import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home_SVG,
  Home_SVG_Cli,
  Search_SVG,
  Search_SVG_Cli,
  Reel_SVG,
  Heart_SVG,
  Heart_SVG_Cli
} from '../svg-view';
import Home from '../components/screens/Home';
import Search from '../components/screens/Search';
import Reels from '../components/screens/Reels';
import Notification from '../components/screens/Notification';
import Profile from '../components/screens/Profile';
import { AuthContext } from '../context/AuthContext';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const { avatarUser } = useContext(AuthContext);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 55,
          borderColor: '#ffffff'
        },
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? <Home_SVG_Cli /> : <Home_SVG />;
          } else if (route.name === 'Search') {
            iconName = focused ? <Search_SVG_Cli /> : <Search_SVG />;
          } else if (route.name === 'Profile') {
            iconName = focused ? (
              <View>
                <Image
                  source={{ uri: avatarUser }}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 26,
                    borderColor: 'black',
                    borderWidth: 1
                  }}
                />
              </View>
            ) : (
              <View>
                <Image
                  source={{ uri: avatarUser }}
                  style={{ width: 26, height: 26, borderRadius: 26 }}
                />
              </View>
            );
          } else if (route.name === 'Reels') {
            iconName = focused ? <Reel_SVG /> : <Reel_SVG />;
          } else if (route.name === 'Notification') {
            iconName = focused ? (
              <Heart_SVG_Cli color="black" like="like" />
            ) : (
              <Heart_SVG />
            );
          }

          return iconName;
        }
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Reels" component={Reels} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default TabNavigator;
