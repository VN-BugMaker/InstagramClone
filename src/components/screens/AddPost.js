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
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { CommonActions } from '@react-navigation/native';
import LoadPost from '../screenComponents/loadAnimated/LoadPost';

const AddPost = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [content, setContent] = useState(null);
  const [base64Img, setBase64Img] = useState();
  const [loading, setLoading] = useState(false);
  const { userToken, idUser } = useContext(AuthContext);
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
    console.log(image);

    await axios
      .post(
        'http://192.168.0.38:5000/api/posts',
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
      console.log(
        result.selected.map((item) => {
          return `data:image/jpg;base64,${item.base64}`;
        })
      );
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>CLOSE</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.txtInput}
          onChangeText={(text) => setContent(text)}
        />
        <TouchableOpacity onPress={pickImage}>
          <Text>Open Image</Text>
        </TouchableOpacity>
        <FlatList
          data={images}
          renderItem={(item) => {
            return (
              <Image
                source={{
                  uri: item.item.uri ? item.item.uri : item.item
                }}
                style={{ width: 200, height: 200 }}
              />
            );
          }}
          keyExtractor={(item, index) => String(index)}
        />
        {/* {images && (
          <Image
            source={{
              uri: images
            }}
            style={{ width: 200, height: 200 }}
          />
        )} */}

        <Button title="Post" onPress={postImage} />
      </View>
      {loading ? <LoadPost /> : null}
    </>
  );
};

export default AddPost;

const styles = StyleSheet.create({
  txtInput: {
    backgroundColor: '#FAFAFA',
    width: '92%',
    height: 44,
    paddingHorizontal: 10,
    marginTop: 12,
    borderRadius: 5
  }
});
