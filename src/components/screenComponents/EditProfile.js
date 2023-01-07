import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
import React, { useState } from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { CommonActions } from '@react-navigation/native';

const EditProfile = ({ route, navigation }) => {
  const { name, imageProfile, accountName } = route.params;
  const [names, setName] = useState(name);
  const [imageProfiles, setImageProfile] = useState(imageProfile);
  const [accountNames, setAccountName] = useState(accountName);
  const [modalVisible, setModalVisible] = useState(false);
  const closeChange = () => {
    setModalVisible(!modalVisible);

    navigation.dispatch({
      ...CommonActions.goBack()
    });
  };
  const updateProfile = () => {
    console.log(names + ' ' + imageProfiles + ' ' + accountNames);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {names !== name ||
        imageProfiles !== imageProfile ||
        accountNames !== accountName ? (
          <Feather
            onPress={() => setModalVisible(true)}
            name="x"
            style={styles.xIcon}
          />
        ) : (
          <Feather
            onPress={() => navigation.goBack()}
            name="x"
            style={styles.xIcon}
          />
        )}
        <Text style={styles.titleHeader}>Chỉnh sửa trang cá nhân</Text>

        {names !== name ||
        imageProfiles !== imageProfile ||
        accountNames !== accountName ? (
          accountNames === '' || names === '' ? (
            <Feather
              name="check"
              style={[styles.checkIcon, { opacity: 0.3 }]}
            />
          ) : (
            <TouchableOpacity onPress={updateProfile}>
              <Feather name="check" style={[styles.checkIcon]} />
            </TouchableOpacity>
          )
        ) : (
          <Feather name="check" style={[styles.checkIcon, { opacity: 0.3 }]} />
        )}
      </View>
      <View style={styles.viewImage}>
        <Image source={{ uri: imageProfile }} style={styles.imageProfile} />
        <Text style={styles.titleChangeImage}>Đổi ảnh đại diện</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Tên</Text>
        <TextInput
          placeholder="Tên"
          defaultValue={accountName}
          style={styles.textInput}
          onChangeText={(text) => setAccountName(text)}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Tên người dùng</Text>
        <TextInput
          placeholder="Tên người dùng"
          defaultValue={name}
          style={styles.textInput}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Tiểu sử</Text>
        <TextInput placeholder="" defaultValue="" style={styles.textInput} />
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          navigation.push('SettingInformation', {
            mails: 'hthung0101@gmail.com',
            phone: '0528187702',
            birthDay: '01/01/2001'
          })
        }
        style={styles.bodySetting}
      >
        <Text style={styles.settingInformation}>Cài đặt thông tin cá nhân</Text>
        <TextInput
          placeholder=""
          defaultValue=""
          style={styles.textInput}
          editable={false}
        />
      </TouchableOpacity>
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={[styles.modalText, { fontWeight: '700', fontSize: 19 }]}
              >
                Thay đổi chưa lưu
              </Text>
              <Text style={[styles.modalText, { opacity: 0.6 }]}>
                Bạn chưa lưu thay đổi. Bạn có chắc chắn muốn hủy không?
              </Text>

              <View
                style={{
                  borderColor: '#efefef',
                  borderBottomWidth: 1,
                  width: 266,
                  borderTopWidth: 1,
                  paddingVertical: 13,
                  marginTop: 30
                }}
              >
                <TouchableOpacity onPress={closeChange}>
                  <Text
                    style={[
                      styles.textStyle,
                      { color: '#26a5f7', fontSize: 16 }
                    ]}
                  >
                    Có
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={{
                  width: 266,
                  paddingVertical: 13
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text
                  style={[styles.textStyle, { color: 'black', fontSize: 16 }]}
                >
                  Không
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    marginTop: 10,
    paddingHorizontal: 16
  },
  titleHeader: {
    fontWeight: '700',
    fontSize: 20,
    position: 'absolute',
    left: 68
  },
  xIcon: {
    fontSize: 30
  },
  checkIcon: {
    fontSize: 30,
    color: '#26a5f7'
  },
  name: {
    fontSize: 30,
    color: '#0f9bf6'
  },
  viewImage: {
    alignItems: 'center'
  },
  imageProfile: {
    width: 95,
    height: 95,
    borderRadius: 100,
    marginTop: 30
  },
  titleChangeImage: {
    color: '#26a5f7',
    fontSize: 18,
    paddingVertical: 10
  },
  body: {
    paddingHorizontal: 15,
    marginVertical: 10
  },
  label: {
    opacity: 0.6,
    fontSize: 12
  },
  textInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#CDCDCD'
  },
  settingInformation: {
    color: '#26a5f7',
    fontSize: 17,
    position: 'absolute',
    bottom: 15,
    left: 15
  },
  bodySetting: {
    marginVertical: 20
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingTop: 35,
    paddingHorizontal: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: '63%'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF'
  },
  buttonClose: {
    backgroundColor: '#2196F3'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
});

export default EditProfile;
