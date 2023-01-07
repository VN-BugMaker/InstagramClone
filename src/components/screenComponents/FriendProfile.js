import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { ProfileBody } from './ProfileBody';
import MoreFollow from './MoreFollow';
import BottomTabProfile from './BottomTabProfile';

const FriendProfile = ({ route, navigation }) => {
  const {
    id,
    name,
    image,
    following,
    follower,
    post,
    accountName,
    data,
    itemFollow
  } = route.params;
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionic
          onPress={() => navigation.goBack()}
          name="arrow-back"
          style={styles.arrowBack}
        />
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
        data={data}
      />
      <MoreFollow message={id} id={id} itemFollow={itemFollow} />
      <BottomTabProfile id={id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  arrowBack: {
    fontSize: 30
  },
  moreVertical: {
    fontSize: 19
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
    width: '90%'
  },
  textSuggest: {
    fontWeight: '500',
    paddingTop: 25,
    paddingHorizontal: 10
  },
  listSuggest: {
    paddingTop: 10
  },
  buttonClose: {
    fontSize: 18,
    opacity: 0.5
  },
  close: {
    position: 'absolute',
    top: 7,
    right: 7
  },
  insideSuggestItem: {
    width: 155,
    height: 200,
    margin: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.3,
    borderRadius: 3,
    borderColor: '#DEDEDE'
  },
  imageItemSuggest: {
    width: 90,
    height: 90,
    borderRadius: 100,
    marginTop: 12
  },
  textName: {
    fontWeight: '600',
    fontSize: 13,
    marginTop: 10
  },
  textAccountName: {
    fontSize: 12,
    opacity: 0.6
  },
  buttonFollow: {
    marginTop: 13
  },
  containerFollow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  buttonMessage: {
    backgroundColor: '#efefef',
    width: '42%',
    height: 30,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addFollow: {
    backgroundColor: '#efefef',
    width: '8%',
    height: 30,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default FriendProfile;
