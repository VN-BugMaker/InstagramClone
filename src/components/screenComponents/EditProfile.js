import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const EditProfile = ({ route, navigation }) => {
  const { name, imageProfile, accountName } = route.params;
  const nav = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather
          onPress={() => navigation.goBack()}
          name="x"
          style={styles.xIcon}
        />
        <Text style={styles.titleHeader}>Chỉnh sửa trang cá nhân</Text>
        <Feather name="check" style={styles.checkIcon} />
      </View>
      <View style={styles.viewImage}>
        <Image source={imageProfile} style={styles.imageProfile} />
        <Text style={styles.titleChangeImage}>Đổi ảnh đại diện</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Tên</Text>
        <TextInput
          placeholder="Tên"
          defaultValue={accountName}
          style={styles.textInput}
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.label}>Tên người dùng</Text>
        <TextInput
          placeholder="Tên người dùng"
          defaultValue={name}
          style={styles.textInput}
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
  }
});

export default EditProfile;
