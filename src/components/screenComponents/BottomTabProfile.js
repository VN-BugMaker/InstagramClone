import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Post, PostFocus, Reel_SVG, Tag, TagFocus } from '../../svg-view';
import postImage from '../../data/postImage';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';

const Tab = createMaterialTopTabNavigator();

const Posts = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.viewImagePost}>
          {postImage.map((item, index) => {
            return (
              <Image key={index} source={item.image} style={styles.imagePost} />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const Videos = () => {
  const { userToken } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const getData = () => {
    axios
      .get('http://192.168.0.38:5000/api/posts', {
        headers: {
          Authorization: userToken
        }
      })
      .then((posts) => {
        setPosts(posts.data.posts);
      })
      .catch((error) => console.log('call fail'));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      {posts.map((item) => {
        return <Text key={item._id}>{item.createdAt}</Text>;
      })}
    </View>
  );
};
const Tags = () => {
  return (
    <View style={styles.container}>
      <Text>hello</Text>
    </View>
  );
};
const BottomTabProfile = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          height: 1.5,
          backgroundColor: 'black'
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Posts') {
            iconName = focused ? <PostFocus /> : <Post />;
          } else if (route.name === 'Videos') {
            iconName = focused ? <Reel_SVG /> : <Reel_SVG focus={true} />;
          } else if (route.name === 'Tags') {
            iconName = focused ? <TagFocus /> : <Tag />;
          }
          return iconName;
        }
      })}
    >
      <Tab.Screen name="Posts" component={Posts} />
      <Tab.Screen name="Videos" component={Videos} />
      <Tab.Screen name="Tags" component={Tags} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%'
  },
  viewImagePost: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 2,
    paddingHorizontal: 0.5
  },
  imagePost: {
    width: 140,
    height: 124,
    marginTop: 1
  }
});

export default BottomTabProfile;
