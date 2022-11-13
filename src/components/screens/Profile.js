import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { followData } from '../../data/followData';
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

const Profile = ({ idUser = 2, token }) => {
  const { logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetRef = useRef(null);
  const snapPoints = ['50%'];
  const handleSheetChanges = (index) => {
    console.log(bottomSheetRef.current?.present());
    setIsOpen(true);
  };
  return (
    <View
      style={[
        styles.container,
        {
          // backgroundColor: isOpen ? "#b9b9b9" : "#ffff",
        }
      ]}
    >
      <BottomSheetModalProvider>
        {followData.map((item, index) => {
          return item.id === idUser ? (
            <View key={index}>
              <View>
                <View style={styles.header}>
                  <View style={styles.headerLeft}>
                    <Text style={styles.nameProfile}>{item.name}</Text>
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
                  // color={isOpen ? "#a5a5a5" : "#efefef"}
                />
              </View>
            </View>
          ) : null;
        })}
        <View style={styles.bottomTab}>
          <BottomTabProfile token={token} />
        </View>
        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          onDismiss={() => setIsOpen(false)}
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
  },
  bottomTab: {
    width: '100%',
    height: '100%',
    marginTop: 10
  }
});

export default Profile;
