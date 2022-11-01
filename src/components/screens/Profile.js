import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { followData } from '../../data/followData';
import { ProfileBody } from '../screenComponents/ProfileBody';
import MoreFollow from '../screenComponents/MoreFollow';
import Feather from 'react-native-vector-icons/Feather';

const Profile = ({ idUser = 2 }) => {
  return (
    <View style={styles.container}>
      {
        followData.map((item, index) => {
          return (

            item.id === idUser ?
              (
                <View key={index}>
                  <View>
                    <View style={styles.header}>
                      <View style={styles.headerLeft}>
                        <Text style={styles.nameProfile} >{item.name}</Text>
                        <Feather name='chevron-down' style={styles.chevronDownIcon} />
                      </View>
                      <View style={styles.headerRight}>
                        <Feather name='plus' style={styles.plusIcon} />
                        <Feather name='menu' style={styles.menuIcon} />
                      </View>
                    </View>
                    <ProfileBody
                      name={item.name}
                      imageProfile={item.profileImage}
                      post={item.posts}
                      follower={item.followers}
                      following={item.following}
                      accountName={item.accountName}
                    />
                  </View>
                  <View>
                    <MoreFollow
                      id={idUser}
                      name={item.name}
                      imageProfile={item.profileImage}
                      accountName={item.accountName}
                    />
                  </View>
                </View>
              ) : null
          )

        })
      }

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    width: '100%',
    height: '100%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  nameProfile: {
    fontWeight: '600',
    fontSize: 18,
    paddingLeft: 20
  },
  chevronDownIcon: {

  },
  plusIcon: {
    fontSize: 30,
    paddingHorizontal: 10
  },
  menuIcon: {
    fontSize: 30,
    paddingHorizontal: 10
  },

})

export default Profile