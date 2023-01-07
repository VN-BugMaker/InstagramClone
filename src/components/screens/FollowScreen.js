import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import ButtonFollow from '../screenComponents/ButtonFollow';
import { AuthContext } from '../../context/AuthContext';
import Dot from 'react-native-vector-icons/Entypo';
const Tab = createMaterialTopTabNavigator();

const FollowScreen = ({ route, navigation }) => {
  const { tab, follower, following, data } = route.params;
  const { idUser } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };
  // Follower
  const renderFollower = ({ item }, idUser) => {
    return (
      <View style={styles.containerFollowing}>
        <View style={styles.left}>
          <View>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          </View>
          <View style={{ paddingLeft: 15 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: '600' }}>{item.username}</Text>
              {!item?.followers.find((follow) => follow === idUser) && (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 5
                  }}
                >
                  <Dot name="dot-single" style={{ fontSize: 16 }} />
                  <TouchableOpacity>
                    <Text
                      style={{
                        color: '#26a5f7',
                        fontWeight: '600'
                      }}
                    >
                      Theo dõi
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Text style={styles.fullname}>{item.fullname}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <TouchableOpacity onPress={() => console.log(item._id)}>
            <View
              style={{
                backgroundColor: '#efefef',
                width: 55,
                height: 33,
                borderRadius: 9,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  color: '#000000',
                  fontWeight: '600',
                  fontSize: 15
                }}
              >
                Xóa
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const Followers = ({ data, idUser, refreshing, onRefresh }) => {
    return (
      <View style={styles.containerFollow}>
        <Text
          style={{
            paddingBottom: 12,
            paddingLeft: 15,
            fontWeight: '600',
            fontSize: 16
          }}
        >
          Tất cả người theo dõi
        </Text>
        <FlatList
          data={data?.followers.map((item) => item)}
          renderItem={(item) => renderFollower(item, idUser)}
          keyExtractor={(item) => item._id}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    );
  };

  // Following

  const renderFollowing = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push('FriendProfile', {
            id: item._id,
            name: item.username,
            image: item.avatar,
            follower: item?.followers.length,
            following: item?.following.length,
            post: item.followers.length,
            accountName: item.fullname,
            data: data
          })
        }
        style={styles.containerFollowing}
      >
        <View style={styles.left}>
          <View>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          </View>
          <View style={{ paddingLeft: 15 }}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.fullname}>{item.fullname}</Text>
          </View>
        </View>
        <View style={styles.right}>
          <View style={{ paddingRight: 10 }}>
            <ButtonFollow width={136} itemUnfollow={item} itemFollow={null} />
          </View>

          <Feather name="more-vertical" style={styles.moreVertical} />
        </View>
      </TouchableOpacity>
    );
  };
  const Followings = ({ data, idUser, refreshing, onRefresh }) => {
    return (
      <View style={styles.containerFollow}>
        <FlatList
          data={data?.following.map((item) => item)}
          renderItem={(item) => renderFollowing(item, idUser)}
          keyExtractor={(item) => item._id}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionic name="arrow-back" style={styles.arrowBack} />
        </TouchableOpacity>
        <View style={styles.insideHeader}>
          <Text style={styles.nameProfile}>{data.username}</Text>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={() => ({
          tabBarLabelStyle: {
            fontSize: 17,
            textTransform: 'none',
            fontWeight: 'bold'
          },
          tabBarIndicatorStyle: {
            height: 1.5,
            backgroundColor: 'black'
          }
        })}
        initialRouteName={tab}
      >
        <Tab.Screen
          name="Followers"
          children={() => (
            <Followers
              data={data}
              idUser={idUser}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
          options={{ title: `Người theo dõi: ${follower}` }}
        />
        <Tab.Screen
          name="Followings"
          children={() => (
            <Followings
              data={data}
              idUser={idUser}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}
          options={{ title: `Đang theo dõi: ${following}` }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default FollowScreen;

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
  containerFollow: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 16
  },
  containerFollowing: {
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
  },
  fullname: {
    opacity: 0.4
  }
});
