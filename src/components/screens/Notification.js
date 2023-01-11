import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { URL } from '../screenComponents/api/Url';

const Notification = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const { userToken, idUser, avatarUser } = useContext(AuthContext);
  useEffect(() => {
    const loadPosts = async () => {
      await fetch(`${URL}/api/notifies`, {
        method: 'GET',
        headers: { Authorization: userToken }
      })
        .then((res) => res.json())
        .then((res) => {
          setData(
            res.notifies.map((item) => {
              return item;
            })
          );
        });
    };
    loadPosts();
  }, []);
  const renderNotification = ({ item }) => {
    return (
      <View style={styles.itemMonth}>
        <View style={styles.item}>
          <TouchableOpacity style={styles.pressItem}>
            <Image
              source={{ uri: item.user.avatar }}
              style={styles.imageItem}
            />
            <Text style={styles.textItem}>
              <Text style={styles.nameItem}>{item.user.username}</Text>{' '}
              {item.text}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.notification}>Thông báo</Text>
      <ScrollView style={styles.scrollWeek}>
        {/* <Text style={styles.thisWeek}>Tuần này</Text> */}
        {/* <View style={styles.listFollow}>
              <TouchableOpacity
                // onPress={() =>
                  // navigation.push('FriendProfile', {
                  //   id: data.id,
                  //   name: data.name,
                  //   image: data.profileImage,
                  //   follower: data.followers,
                  //   following: data.following,
                  //   post: data.posts,
                  //   accountName: data.accountName
                  // })
                // }
                // key={index}
              >
                <Text>{}, </Text>
              </TouchableOpacity>
            
            
          <Text>đã theo dõi bạn</Text>
        </View> */}
        <Text style={styles.thisMonth}>Tất cả thông báo</Text>
        <FlatList
          renderItem={(item) => renderNotification(item)}
          data={data}
          keyExtractor={(item, index) => String(index)}
        />
        {/* {followData.map((data, index) => {
          const [follow, setFollow] = useState(data.follow);
          return (
            <View key={index} style={styles.itemMonth}>
              <View style={styles.item}>
                <TouchableOpacity style={styles.pressItem}>
                  <Image source={data.profileImage} style={styles.imageItem} />
                  <Text style={styles.textItem}>
                    <Text style={styles.nameItem}>{data.name}</Text> đang dùng
                    Instagram
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setFollow(!follow)}
                  style={{ width: follow ? 100 : 80 }}
                ></TouchableOpacity>
              </View>
            </View>
          );
        })} */}
      </ScrollView>
    </View>
  );
};
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
    padding: 10
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
    marginRight: 10
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20
  },
  pressItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '64%'
  },
  textItem: {
    fontSize: 14
  },
  nameItem: {
    fontWeight: 'bold'
  }
});

export default Notification;
