import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { ProfileBody, FollowButton } from './ProfileBody';


const FriendProfile = ({ route, navigation }) => {
  const { name, image, following, follower, post, accountName } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionic onPress={() => navigation.goBack()} name="arrow-back" style={styles.arrowBack} />
        <View style={styles.insideHeader}>
          <Text style={styles.nameProfile}>{name}</Text>
          <Feather name="more-vertical" style={styles.moreVertical} />
        </View>
      </View>
      <ProfileBody
        name={name}
        imageProfile={image}
        post={post}
        follower={follower}
        following={following}
        accountName={accountName}
      />
      <FollowButton id={1} />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: 10
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  arrowBack: {
    fontSize: 30,
  },
  moreVertical: {
    fontSize: 19,
  },
  nameProfile: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 29
  },
  insideHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "90%",
  },
})
export default FriendProfile