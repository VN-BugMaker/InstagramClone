import { React } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CardStyleInterpolators,createStackNavigator } from '@react-navigation/stack';
import Home from "./src/components/screens/Home";
import Search from "./src/components/screens/Search";
import Reels from "./src/components/screens/Reels";
import Activity from "./src/components/screens/Activity";
import Profile from "./src/components/screens/Profile";
import { Home_SVG, Home_SVG_Cli, Search_SVG, Search_SVG_Cli, Reel_SVG, Heart_SVG, Heart_SVG_Cli, NewPost_SVG } from "./src/svg-view";
import Status from "./src/components/screenComponents/StatusStories";
import { View, Image } from "react-native";
import users from "./src/data/user";
import FriendProfile from "./src/components/screenComponents/FriendProfile";
const App = () => {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();


  const BottomTabScreen = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
            height: 55,
            borderColor: '#ffffff',
          },
          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? <Home_SVG_Cli />
                : <Home_SVG />
            } else if (route.name === 'Search') {
              iconName = focused
                ? <Search_SVG_Cli />
                : <Search_SVG />
            } else if (route.name === 'Profile') {
              iconName = focused
                ? (<View>
                  <Image source={users.avatar} style={{ width: 26, height: 26, borderRadius: 26, borderColor: 'black', borderWidth: 1 }} />
                </View>)
                : (<View>
                  <Image source={users.avatar} style={{ width: 26, height: 26, borderRadius: 26 }} />
                </View>)
            } else if (route.name === 'Reels') {
              iconName = focused
                ? <Reel_SVG />
                : <Reel_SVG />
            } else if (route.name === 'Activity') {
              iconName = focused
                ? <Heart_SVG_Cli color='black' />
                : <Heart_SVG />
            }

            return iconName;
          }

        })}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Reels" component={Reels} />
        <Tab.Screen name="Activity" component={Activity} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Bottom" component={BottomTabScreen} />
        <Stack.Screen name="Status" component={Status} />
        <Stack.Screen
          name="FriendProfile"
          component={FriendProfile}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forHorizontalIOS,
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
