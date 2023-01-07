import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import Dot from 'react-native-vector-icons/Entypo';
import { AuthContext } from '../../context/AuthContext';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CameraSvg } from '../../svg-view';
import { ScrollView } from 'react-native-virtualized-view';
import { URL } from '../screenComponents/api/Url';

const Message = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const { username, userToken, idUser } = useContext(AuthContext);

  const Chat = () => {
    const [conversation, setConversation] = useState([]);

    //   const onRefresh = () => {
    //     setRefreshing(true);
    //     setTimeout(() => {
    //       setRefreshing(false);
    //     }, 2000);
    //   };
    const getConversations = async () => {
      await fetch(`${URL}/api/conversations`, {
        method: 'GET',
        headers: { Authorization: userToken }
      })
        .then((res) => res.json())
        .then((res) => {
          setConversation(
            res.conversations.map((item) => {
              return item;
            })
          );
        });
    };
    useEffect(() => {
      getConversations();
    }, []);

    const renderChat = ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() =>
            item.recipients.map((item, index) => {
              return (
                item._id !== idUser &&
                navigation.navigate('MessageDetail', {
                  username: item.username,
                  avatar: item.avatar,
                  _id: item._id,
                  fullname: item.fullname
                })
              );
            })
          }
          style={styles.containerMessages}
        >
          <View style={styles.left}>
            <View>
              {item.recipients.map((item, index) => {
                return (
                  item._id !== idUser && (
                    <Image
                      key={index}
                      source={{ uri: item.avatar }}
                      style={styles.avatar}
                    />
                  )
                );
              })}
            </View>
            <View style={{ paddingLeft: 15 }}>
              <View style={{ flexDirection: 'row' }}>
                {item.recipients.map((item, index) => {
                  return (
                    item._id !== idUser && (
                      <Text key={index} style={{ fontWeight: '600' }}>
                        {item.username}
                      </Text>
                    )
                  );
                })}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  opacity: 1 ? 1 : 0.4
                }}
              >
                <Text
                  style={{
                    fontWeight: 'bold'
                  }}
                >
                  {item.text}
                </Text>
                <Dot
                  style={{
                    fontWeight: 'bold'
                  }}
                  name="dot-single"
                />
                <Text
                  style={{
                    fontWeight: 'bold'
                  }}
                >
                  5 giờ
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.right}>
            <Dot name="dot-single" style={{ fontSize: 35, color: '#26a5f7' }} />
            <TouchableOpacity>
              <CameraSvg />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.containerMessage}>
        <FlatList
          data={conversation}
          renderItem={(item) => renderChat(item)}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  };

  const Call = () => {
    return (
      <View>
        <Text>Call</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionic
          onPress={() => navigation.goBack()}
          name="arrow-back"
          style={styles.arrowBack}
        />
        <View style={styles.insideHeader}>
          <Text style={styles.nameProfile}>{username}</Text>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarLabelStyle: {
            fontSize: 14,
            textTransform: 'none',
            fontWeight: '500'
          },
          tabBarIndicatorStyle: {
            height: 1,
            backgroundColor: 'black'
          }
        })}
      >
        <Tab.Screen name="Chat" component={Chat} options={{ title: `Chat ` }} />
        <Tab.Screen
          name="Call"
          component={Call}
          options={{ title: `Cuộc gọi ` }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  arrowBack: {
    fontSize: 30
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
  containerMessage: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 16
  },
  containerMessages: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 8
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 58
  },
  username: {
    fontWeight: 'bold'
  }
});
