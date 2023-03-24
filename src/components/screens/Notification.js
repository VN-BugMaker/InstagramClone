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
  const { userToken, idUser, avatarUser, username } = useContext(AuthContext);
  // console.log(data);

  //   socket.emit('createNotify', {
  //     ...res.data.notify,
  //     user: {
  //         username: username,
  //         avatar: avatarUser
  //     }
  // })

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
        <Text style={styles.thisMonth}>Tất cả thông báo</Text>
        <FlatList
          renderItem={(item) => renderNotification(item)}
          data={data}
          keyExtractor={(item, index) => String(index)}
        />
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
