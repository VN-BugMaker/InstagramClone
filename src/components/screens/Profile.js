import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ProfileBody } from '../screenComponents/ProfileBody';
import MoreFollow from '../screenComponents/MoreFollow';
import Feather from 'react-native-vector-icons/Feather';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import BottomTabProfile from '../screenComponents/BottomTabProfile';
import { AuthContext } from '../../context/AuthContext';
import { ScrollView } from 'react-native-virtualized-view';
import { URL } from '../screenComponents/api/Url';

const Profile = () => {
  const { logout } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const { userToken, idUser } = useContext(AuthContext);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['50%'];
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };

  const handleSheetChanges = (index) => {
    bottomSheetRef.current?.present();
  };

  const getProFile = async () => {
    await fetch(`${URL}/api/user/${idUser}`, {
      method: 'GET',
      headers: { Authorization: userToken }
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.user);
      });
  };

  useEffect(() => {
    getProFile();
  }, [refreshing]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <BottomSheetModalProvider>
          {data._id === idUser ? (
            <View>
              <ScrollView
                style={{ backgroundColor: 'red ' }}
                scrollEnabled={false}
                nestedScrollEnabled={true}
                horizontal={false}
                refreshing={refreshing}
                onRefresh={onRefresh}
                // onRefresh={
                // <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                // }
              >
                <View>
                  <View style={styles.header}>
                    <View style={styles.headerLeft}>
                      <Text style={styles.nameProfile}>{data.username}</Text>
                      <Feather
                        name="chevron-down"
                        style={styles.chevronDownIcon}
                      />
                    </View>
                    <View style={styles.headerRight}>
                      <Feather name="plus" style={styles.plusIcon} />
                      <Feather
                        onPress={handleSheetChanges}
                        name="menu"
                        style={styles.menuIcon}
                      />
                    </View>
                  </View>

                  <View>
                    <ProfileBody
                      name={data.username}
                      imageProfile={data.avatar}
                      post={data.followers.length}
                      follower={data.followers.length}
                      following={data.following.length}
                      accountName={data.fullname}
                      data={data}
                    />
                    {/* {console.log(data.following.length)} */}
                  </View>
                </View>
                <View>
                  <MoreFollow
                    id={idUser}
                    name={data.username}
                    imageProfile={data.avatar}
                    accountName={data.fullname}
                    itemFollow={data}
                  />
                </View>
              </ScrollView>
            </View>
          ) : null}
          <BottomTabProfile id={idUser} />
          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={(props) => (
              <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
              />
            )}
          >
            <View>
              <Button title="Logout" onPress={() => logout()} />
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </View>
    </View>
  );
};
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
  chevronDownIcon: {},
  plusIcon: {
    fontSize: 30,
    paddingHorizontal: 10
  },
  menuIcon: {
    fontSize: 30,
    paddingHorizontal: 10
  }
});

export default Profile;
