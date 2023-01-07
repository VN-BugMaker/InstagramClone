import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { URL } from './api/Url';

const ButtonFollow = ({ width, itemFollow, itemUnfollow }) => {
  const [follow, setFollow] = useState(false);
  const { userToken, idUser } = useContext(AuthContext);
  const handleFollow = () => {
    changeFollow(
      itemFollow
        ? itemFollow?.following.find((follow) => follow._id === itemFollow._id)
          ? 'unfollow'
          : 'follow'
        : itemUnfollow?.followers.find(
            (follow) => follow._id === itemUnfollow._id
          )
        ? 'follow'
        : 'unfollow'
    );
    setFollow(!follow);
  };

  const changeFollow = (change) => {
    fetch(
      `${URL}/api/user/${
        itemFollow ? itemFollow._id : itemUnfollow._id
      }/${change}`,
      {
        method: 'PATCH',
        headers: { Authorization: userToken }
      }
    );
    setFollow(!follow);
  };
  // useEffect(() => {}, []);

  return (
    <View>
      <TouchableOpacity
        onPress={() => handleFollow()}
        style={{
          width: itemFollow
            ? itemFollow?.following.find(
                (follow) => follow._id === itemFollow._id
              )
              ? width
              : width
            : itemUnfollow?.followers.find(
                (follow) => follow._id === itemUnfollow._id
              )
            ? width
            : width
        }}
      >
        <View
          style={{
            backgroundColor: itemFollow
              ? itemFollow?.following.find(
                  (follow) => follow._id === itemFollow._id
                )
                ? '#efefef'
                : '#0095f6'
              : itemUnfollow?.followers.find(
                  (follow) => follow._id === itemUnfollow._id
                )
              ? '#0095f6'
              : '#efefef',
            width: '100%',
            height: 30,
            borderRadius: 9,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: itemFollow
                ? itemFollow?.following.find(
                    (follow) => follow._id === itemFollow._id
                  )
                  ? '#000000'
                  : '#ffffff'
                : itemUnfollow?.followers.find(
                    (follow) => follow._id === itemUnfollow._id
                  )
                ? '#ffffff'
                : '#000000',
              fontWeight: 'bold',
              fontSize: 14
            }}
          >
            {itemFollow
              ? itemFollow?.following.find(
                  (follow) => follow._id === itemFollow._id
                )
                ? 'Đang theo dõi'
                : 'Theo dõi'
              : itemUnfollow?.followers.find(
                  (follow) => follow._id === itemUnfollow._id
                )
              ? 'Theo dõi'
              : 'Đang theo dõi'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonFollow;
