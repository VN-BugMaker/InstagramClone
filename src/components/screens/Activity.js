import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-virtualized-view';
import { followData } from '../../data/followData';
import { useNavigation } from '@react-navigation/native';

const Activity = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.notification}>Thông báo</Text>
      <ScrollView style={styles.scrollWeek}>
        <Text style={styles.thisWeek}>Tuần này</Text>
        <View style={styles.listFollow}>
          {
            followData.slice(0, 4).map((data, index) => {
              return (
                <TouchableOpacity onPress={() => navigation.push('FriendProfile', {
                  id: data.id,
                  name: data.name,
                  image: data.profileImage,
                  follower: data.followers,
                  following: data.following,
                  post: data.posts,
                  accountName: data.accountName
                })} key={index}>
                  <Text>{data.name}, </Text>
                </TouchableOpacity>
              )
            })
          }
          <Text>đã theo dõi bạn</Text>
        </View>
        <Text style={styles.thisMonth}>Tháng này</Text>
        {
          followData.map((data, index) => {
            const [follow, setFollow] = useState(data.follow)
            return (
              <View key={index} style={styles.itemMonth}>
                <View style={styles.item}>
                  <TouchableOpacity style={styles.pressItem}>
                    <Image source={data.profileImage} style={styles.imageItem} />
                    <Text style={styles.textItem}><Text style={styles.nameItem}>{data.name}</Text> đang dùng Instagram</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setFollow(!follow)} style={{ width: follow ? 100 : 80 }}>
                    <View style={{
                      backgroundColor: follow ? '#efefef' : '#0095f6',
                      width: '100%',
                      height: 32,
                      borderRadius: 6,
                      justifyContent: 'center',
                      alignItems: 'center'

                    }}>
                      <Text style={{
                        color: follow ? '#000000' : '#ffffff',
                        fontWeight: 'bold',
                        fontSize: 14
                      }}>
                        {follow ? 'Đang theo dõi' : 'Theo dõi'}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )
          })
        }
      </ScrollView >
    </View >
  )
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  notification: {
    fontSize: 23,
    fontWeight: 'bold',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DEDEDE',
    padding: 10,
  },
  scrollWeek: {
    margin: 10
  },
  thisWeek: {
    fontWeight: 'bold'
  },
  listFollow: {
    flexDirection: 'row',
    paddingVertical: 10
  },
  thisMonth: {
    fontWeight: 'bold'
  },
  itemMonth: {
    width: '100%'
  },
  imageItem: {
    width: 45,
    height: 45,
    borderRadius: 45,
    marginRight: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,

  },
  pressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '64%',
  },
  textItem: {
    fontSize: 14,
  },
  nameItem: {
    fontWeight: 'bold'
  },

})

export default Activity