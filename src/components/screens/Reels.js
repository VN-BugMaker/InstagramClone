import { View, Text } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const URL = 'http://192.168.0.38:5000/api/posts';
const Reels = () => {
  const { userToken } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const getData = () => {
    axios
      .get(URL, {
        headers: {
          Authorization: userToken
        }
      })
      .then((posts) => {
        setPosts(posts.data.posts);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      {posts.map((item, index) => {
        return <Text key={index}>{item._id}</Text>;
      })}
    </View>
  );
};

export default Reels;
