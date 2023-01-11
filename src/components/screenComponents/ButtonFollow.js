import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { URL } from './api/Url';

const ButtonFollow = ({ width, itemFollow, itemUnfollow, isFollow }) => {
  const [follow, setFollow] = useState(isFollow);
  const { userToken, idUser } = useContext(AuthContext);
  const changeFollow = () => {
    setFollow(!follow);
    fetch(
      `${URL}/api/user/${itemFollow ? itemFollow._id : itemUnfollow._id}/${
        follow ? 'unfollow' : 'follow'
      }`,
      {
        method: 'PATCH',
        headers: { Authorization: userToken }
      }
    );
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => changeFollow()}
        style={{
          width: follow ? width : width
        }}
      >
        <View
          style={{
            backgroundColor: follow ? '#efefef' : '#0095f6',
            width: '100%',
            height: 30,
            borderRadius: 9,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{
              color: follow ? '#000000' : '#ffffff',
              fontWeight: 'bold',
              fontSize: 14
            }}
          >
            {follow ? 'Đang theo dõi' : 'Theo dõi'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonFollow;
