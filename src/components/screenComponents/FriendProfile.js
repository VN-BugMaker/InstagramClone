import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ProfileBody, Contact } from './ProfileBody';
import { followData } from '../../data/followData';
import ButtonFollow from './ButtonFollow';
import { MorePeople, MorePeopleClick } from '../../svg-view';


const FriendProfile = ({ route, navigation }) => {
  const { id, name, image, following, follower, post, accountName } = route.params;
  const [close, setClose] = useState(false);
  const [moreFollow, setMoreFollow] = useState(moreFollow)
  
  const itemSuggest = ({ item }) => {
    return (
      <View style={{ marginLeft: 6 }}>
        {
          item.id === id || close ? null : (
            <View style={styles.insideSuggestItem}>
              <TouchableOpacity style={styles.close}>
                <AntDesign name='close' style={styles.buttonClose} />
              </TouchableOpacity>
              <Image source={item.profileImage} style={styles.imageItemSuggest} />
              <Text style={styles.textName}>{item.name}</Text>
              <Text style={styles.textAccountName}>{item.accountName}</Text>
              <View style={styles.buttonFollow}>
                <ButtonFollow width={136} />
              </View>

            </View>
          )
        }
      </View>
    )
  }
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
      <View>
        {
          (
            <View style={styles.containerFollow}>
              <ButtonFollow width={170} />
              <View style={styles.buttonMessage}>
                <Text>Nhắn tin</Text>
              </View>
              <TouchableOpacity activeOpacity={1} onPress={() => setMoreFollow(!moreFollow)} style={styles.addFollow}>
                {moreFollow ? <MorePeopleClick /> : <MorePeople />}
              </TouchableOpacity>
            </View>
          )

        }
      </View>
      {
        moreFollow ? (
          <View>
            <Text style={styles.textSuggest}>Gợi ý cho bạn</Text>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={followData}
              renderItem={itemSuggest}
              keyExtractor={data => data.id}
              style={styles.listSuggest}
            />
          </View>) : null
      }

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
    right: 7,
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
})
export default FriendProfile