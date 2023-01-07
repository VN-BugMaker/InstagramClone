import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Post, PostFocus, Reel_SVG, Tag, TagFocus } from '../../svg-view';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { ScrollView } from 'react-native-virtualized-view';
import { useNavigation } from '@react-navigation/native';
import { URL } from './api/Url';
const Tab = createMaterialTopTabNavigator();

const Posts = ({ id }) => {
  const navigation = useNavigation();
  const { userToken, idUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };
  useEffect(() => {
    setIsLoading(true);
    const loadPosts = async () => {
      await fetch(`${URL}/api/user_posts/${id}?limit=100`, {
        method: 'GET',
        headers: { Authorization: userToken }
      })
        .then((res) => res.json())
        .then((res) => {
          setPosts(res.posts);
          setIsLoading(false);
        });
    };
    loadPosts();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color={'#999999'} size={'large'} />
      ) : (
        <ScrollView
          scrollEnabled={true}
          refreshing={refreshing}
          onRefresh={onRefresh}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={styles.viewImagePost}>
            {posts.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.push('PostDetail', {
                      id: item._id
                    })
                  }
                >
                  {item.images.map((item, index) => {
                    return (
                      <View key={index}>
                        <Image
                          source={{
                            uri: item.url
                          }}
                          style={styles.imagePost}
                        />
                      </View>
                    );
                  })}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const Videos = () => {
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const getData = () => {
    axios
      .get(`${URL}/api/posts`, {
        headers: {
          Authorization: userToken
        }
      })
      .then((posts) => {
        setPosts(posts.data.posts);
      })
      .catch((error) => console.log('call fail'));
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator color={'#999999'} size={'large'} />
      ) : (
        posts.map((item) => {
          return <Text key={item._id}>{item.createdAt}</Text>;
        })
      )}
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
const BottomTabProfile = ({ id }) => {
  return (
    <View style={{ flex: 1, marginTop: 10 }}>
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
        <Tab.Screen name="Posts" children={() => <Posts id={id} />} />
        <Tab.Screen name="Videos" component={Videos} />
        <Tab.Screen name="Tags" component={Tags} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1
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
