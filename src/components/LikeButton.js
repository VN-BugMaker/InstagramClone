import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Heart_SVG, Heart_SVG_Cli } from '../svg-view';

const LikeButton = ({ isLike, handleLike, handleUnLike, idUser, item }) => {
  const [like, setLike] = useState(isLike);
  useEffect(() => {
    if (item.likes.find((item) => item._id === idUser)) {
      setLike(true);
    }
  }, [item.likes, idUser, item]);

  return (
    <View>
      {like ? (
        <TouchableOpacity onPress={handleUnLike}>
          <Heart_SVG_Cli like="like" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleLike}>
          <Heart_SVG handleLike />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LikeButton;

const styles = StyleSheet.create({});
