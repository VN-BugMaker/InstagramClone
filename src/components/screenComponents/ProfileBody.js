import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export const ProfileBody = ({
  name,
  imageProfile,
  post,
  follower,
  following,
  accountName,
  data
}) => {
  const navigation = useNavigation();
  return (
    <View>
      {
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={{ uri: imageProfile }} style={styles.imageProfile} />
            <Text style={styles.nameProfile}>{accountName}</Text>
          </View>
          <TouchableOpacity style={styles.rightContainer}>
            <Text style={styles.text}>{post}</Text>
            <Text>Bài viết</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.push('FollowScreen', {
                tab: 'Followers',
                follower,
                following,
                data
              })
            }
            style={styles.rightContainer}
          >
            <Text style={styles.text}>{follower}</Text>
            <Text>Người theo dõi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.push('FollowScreen', {
                tab: 'Followings',
                follower,
                following,
                data
              })
            }
            style={styles.rightContainer}
          >
            <Text style={styles.text}>{following}</Text>
            <Text>Đang theo dõi</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 20
  },
  leftContainer: {
    alignItems: 'center'
  },
  rightContainer: {
    alignItems: 'center'
  },
  imageProfile: {
    width: 83,
    height: 83,
    borderRadius: 100
  },
  nameProfile: {
    paddingVertical: 5,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});
