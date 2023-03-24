import {
  StyleSheet,
  Button,
  Image,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Ionic from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { CommonActions } from '@react-navigation/native';
import LoadPost from '../screenComponents/loadAnimated/LoadPost';
import { URL } from '../screenComponents/api/Url';
import { FilesImage } from '../../svg-view';

const AddPost = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [content, setContent] = useState(null);
  const [base64Img, setBase64Img] = useState();
  const [loading, setLoading] = useState(false);
  const { userToken, idUser, avatarUser, username } = useContext(AuthContext);
  // const postImageServer = async (img) => {
  //   const formData = new FormData();
  //   formData.append('file', base64Img);
  //   formData.append('upload_preset', 'x4dvib4l');
  //   formData.append('cloud_name', 'dw1sniewf');
  //   // console.log(img);
  //   const res = await fetch(
  //     'https://api.cloudinary.com/v1_1/dw1sniewf/image/upload',
  //     {
  //       method: 'POST',
  //       body: formData
  //     }
  //   );
  //   const image = await res.json();
  //   setImages(image);
  // };
  const postImage = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', base64Img);
    formData.append('upload_preset', 'x4dvib4l');
    formData.append('cloud_name', 'dw1sniewf');
    // console.log(img);
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dw1sniewf/image/upload',
      {
        method: 'POST',
        body: formData
      }
    );

    const image = await res.json();

    await axios
      .post(
        `${URL}/api/posts`,
        {
          images: image,
          content: content,
          user: idUser
        },
        {
          headers: { Authorization: userToken }
        }
      )
      .then((res) => {
        navigation.dispatch({
          ...CommonActions.goBack()
        });
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
        base64: true
      });
      // console.log(
      //   result.selected.map((item) => {
      //     return `data:image/jpg;base64,${item.base64}`;
      //   })
      // );
      if (!result.cancelled) {
        setImages(result.uri ? [result.uri] : result.selected);
        // result.selected
        //   ? postImageServer(
        //       result.selected.map((item) => {
        //         let base64Img = `data:image/jpg;base64,${item.base64}`;
        //         return base64Img;
        //       })
        //     )
        //   : null;
        let base64Img = `data:image/jpg;base64,${result.base64}`;
        setBase64Img(base64Img);
        // console.log(base64Img);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#ffff'
        }}
      >
        <View
          style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
        >
          <Ionic
            onPress={() => navigation.goBack()}
            name="arrow-back"
            style={{ fontSize: 30 }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '90%'
            }}
          >
            <Text style={{ fontSize: 19, marginLeft: 15 }}>Tạo bài viết</Text>
            <TouchableOpacity
              style={{
                padding: 7,
                paddingHorizontal: 8,
                backgroundColor: content ? '#4e96ff' : 'rgba(0,0,0,0.1)',
                borderRadius: 5
              }}
              disabled={content ? false : true}
              onPress={content ? postImage : null}
            >
              <Text
                style={{
                  color: content ? '#ffff' : 'rgba(0,0,0,0.2)',
                  fontWeight: '700'
                }}
              >
                ĐĂNG
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.left}>
          <View>
            <Image source={{ uri: avatarUser }} style={styles.avatar} />
          </View>
          <View style={{ paddingLeft: 2 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontWeight: '700', fontSize: 16 }}>
                {username}
              </Text>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 1 ? 1 : 0.4
              }}
            ></View> */}
          </View>
        </View>
        <TextInput
          style={styles.txtInput}
          onChangeText={(text) => setContent(text)}
          placeholder="Bạn đang nghĩ gì?"
        />
        <View style={{ flex: 1 }}>
          <FlatList
            data={images}
            renderItem={(item) => {
              return (
                <Image
                  source={{
                    uri: item.item ? item.item : item.item.uri
                  }}
                  style={{ width: '100%', height: 980 }}
                />
              );
            }}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
        {/* {console.log(
          images.map((item) => {
            return item;
          })
        )} */}

        {/* {images && (
          <Image
            source={{
              uri: images
            }}
            style={{ width: 200, height: 200 }}
          />
        )} */}
        <View
          style={{
            justifyContent: 'flex-end',
            borderWidth: 0.5,
            width: '100%',
            height: 40
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 6,
              top: 3
            }}
            onPress={pickImage}
          >
            <FilesImage />
            <Text style={{ paddingHorizontal: 8, fontSize: 17 }}>
              Ảnh/video
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading ? <LoadPost /> : null}
    </>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  txtInput: {
    backgroundColor: '#ffff',
    width: '92%',
    height: 44,
    paddingHorizontal: 10,
    marginTop: 12,
    borderRadius: 5,
    fontSize: 20
  },
  left: {
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
