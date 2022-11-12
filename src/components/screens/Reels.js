import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URL = "http://192.168.0.38:5000/api/posts";
const Reels = () => {
  const [posts, setPosts] = useState([])
  const getData = async () => {
    const token = await AsyncStorage.getItem('access_token')
    axios.get(URL, {
      headers: {
        Authorization: token
      }
    })
      .then(posts => {
        setPosts(posts.data.posts);
      })
      .catch(error => console.log(error))
  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <View>
      {
        posts.map((item, index) => {
          return (
            <Text key={index}>{item._id}</Text>
          )
        })
      }
    </View>
  )
}

export default Reels