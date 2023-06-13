import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import InstaStory from 'react-native-insta-story';
import { URL } from './api/Url';
import { AuthContext } from '../../context/AuthContext';
import { useState } from 'react';

const Stories = () => {
  const navigation = useNavigation();
  const { userToken, idUser, avatarUser, username } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const loadStories = async () => {
      await fetch(`${URL}/api/stories`, {
        method: 'GET',
        headers: { Authorization: userToken }
      })
        .then((res) => res.json())
        .then((res) => {
          setData(
            res.sortStories.map((item) => {
              return {
                stories: item.stories,
                user_name:
                  item.user.username === username
                    ? 'Your Story'
                    : item.user.username,
                user_image: item.user.avatar,
                user_id: item.user._id
              };
            })
          );
          setIsLoading(!isLoading);
        });
    };
    loadStories();
  }, []);

  const mergeData = (data) => {
    const mergedObject = {};
    data.forEach((e) => {
      if (!mergedObject[e.user_id]) {
        mergedObject[e.user_id] = {
          user_id: e.user_id,
          stories: e.stories,
          user_image: e.user_image,
          user_name: e.user_name
        };
      }
    });
    const mergedArray = Object.values(mergedObject);
    return mergedArray;
  };
  const mergedArray = mergeData(data);
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => navigation.navigate('NewStories')}>
        <View style={{ position: 'absolute', bottom: 18, left: 52, zIndex: 1 }}>
          <Entypo
            name="circle-with-plus"
            style={{
              fontSize: 20,
              color: '#3897F0',
              backgroundColor: 'white',
              borderRadius: 100
            }}
          />
        </View>

        <LinearGradient
          colors={['#ffffff', '#fff']}
          start={{ x: 0.0, y: 1.2 }}
          end={{ x: 1.0, y: 1.0 }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 76,
            height: 76,
            borderRadius: 76 / 2,
            borderColor: '#fff',
            borderWidth: 1
          }}
        >
          <Image
            resizeMode="cover"
            source={{ uri: avatarUser }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 70 / 2,
              borderColor: '#fff',
              borderWidth: 3,
              alignSelf: 'center'
            }}
          />
        </LinearGradient>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 10
          }}
        >
          New Story
        </Text>
      </TouchableOpacity>
      {isLoading && <InstaStory data={mergedArray} duration={10} />}
    </View>
  );
};

export default Stories;
