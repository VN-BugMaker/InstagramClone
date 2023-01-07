import { View, Text, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { URL } from '../screenComponents/api/Url';

const url = `${URL}/api/posts`;
const Reels = () => {
  const { userToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const getData = async () => {
    await axios
      .get(url, {
        headers: {
          Authorization: userToken
        }
      })
      .then((posts) => {
        setPosts(posts.data.posts);
        return posts.data.posts;
      })
      .catch((error) => console.log('call fail'));
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      {isLoading ? (
        <ActivityIndicator color={'#999999'} size={'large'} />
      ) : (
        posts.map((item, index) => {
          return <Text key={index}>{item._id}</Text>;
        })
      )}
    </View>
  );
};

export default Reels;
