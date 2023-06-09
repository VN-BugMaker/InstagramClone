import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React, { useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import * as MediaLibrary from 'expo-media-library';
import { useState } from 'react';
import PagerView from 'react-native-pager-view';

const NewStories = ({ navigation }) => {
  const [images, setImages] = useState([]);
  const [multiImage, setMultiImages] = useState(false);
  const widthImages = Dimensions.get('window').width / 3;
  const [listImages, setListImages] = useState([]);
  // const heightImages = Dimensions.get('window').height / 3.5;
  useEffect(() => {
    pickImage();
  }, []);
  const pickImage = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission denied');
      return;
    }

    const albums = await MediaLibrary.getAlbumAsync('Screenshots');
    const { assets } = await MediaLibrary.getAssetsAsync({
      first: albums.assetCount,
      mediaType: MediaLibrary.MediaType.photo,
      sortBy: 'default'
    });
    setImages(
      assets.map((item) => {
        return item.uri;
      })
    );
  };

  const loadGallery = (item) => {
    const handlerLongClick = () => {
      console.log(listImages);
    };
    const chooseImages = (item) => {
      if (listImages.filter((list) => list.id === item.index).length) {
        const newArr = listImages.filter((list) => list.id !== item.index);
        setListImages(newArr);
      } else {
        if (listImages.length < 8) {
          setListImages((oldList) => [
            ...oldList,
            {
              id: item.index,
              imagesUrl: item.item
            }
          ]);
        } else {
          alert('Giới hạn là 8 ảnh');
        }
      }
    };
    const countSelectedItems = (itemId) => {
      const selected = listImages.findIndex((i) => i.id === itemId);
      return selected !== -1 ? selected + 1 : null;
    };
    const isCheck = listImages.some((list, index) => list.id === item.index);
    return (
      <TouchableOpacity
        onPress={() => chooseImages(item)}
        onLongPress={() => handlerLongClick(item)}
      >
        {multiImage ? (
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 18,
              backgroundColor: isCheck ? '#0095f6' : 'rgba(52, 52, 52, 0.6)',
              right: 7,
              top: 5,
              position: 'absolute',
              zIndex: 1,
              borderWidth: 1,
              borderColor: 'white'
            }}
          >
            {isCheck && (
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  top: -4,
                  right: 3.5
                }}
              >
                <Text style={{ color: 'white', fontSize: 19 }}>
                  {countSelectedItems(item.index)}
                </Text>
              </View>
            )}
          </View>
        ) : null}
        <Image
          source={{
            uri: item.item ? item.item : item.item.uri
          }}
          style={{
            width: widthImages,
            height: 230,
            margin: 0.8
          }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <PagerView style={{ flex: 1 }} orientation="vertical" initialPage={1}>
      <View key="1">
        <Text>Second page</Text>
      </View>
      <View style={styles.main} key="2">
        <View style={styles.header}>
          <AntDesign
            name="close"
            onPress={() => navigation.goBack()}
            style={styles.buttonClose}
          />
          <Text style={{ color: 'white', fontSize: 18 }}>Thêm vào tin</Text>
          <View></View>
        </View>
        <View style={styles.header}>
          <Text style={{ color: 'white', fontSize: 18 }}>Thư viện</Text>
          <TouchableOpacity
            onPress={() => setMultiImages(!multiImage)}
            style={{
              backgroundColor: multiImage ? '#b7b8bc' : '#1f1f1f',
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
              height: 30,
              borderRadius: 100
            }}
          >
            <Text
              style={{ color: multiImage ? 'black' : 'white', fontSize: 12 }}
            >
              {multiImage ? 'Hủy' : 'Chọn'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            width: widthImages,
            height: 230,
            margin: 0.8,
            flexWrap: 'wrap',
            flexDirection: 'row'
          }}
        ></View> */}
        <FlatList
          style={{ flexDirection: 'column' }}
          data={images}
          renderItem={(item) => loadGallery(item)}
          keyExtractor={(item, index) => String(index)}
          numColumns={3}
        />
        {multiImage ? (
          <View
            style={{
              height: 60,
              backgroundColor: 'rgba(1,1,1,0.9)',
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 91,
              flexDirection: 'row'
            }}
          >
            {listImages.map((i, index) => {
              return (
                <Image
                  key={index}
                  source={{
                    uri: i.imagesUrl
                  }}
                  style={{
                    width: 28,
                    height: 50,
                    margin: 5,
                    borderRadius: 7
                  }}
                  resizeMode="cover"
                />
              );
            })}
            <TouchableOpacity
              onPress={() =>
                navigation.push('NextStories', {
                  data: listImages
                })
              }
              style={{
                height: 42,
                width: 80,
                borderRadius: 20,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                position: 'absolute',
                right: 0,
                top: 9
              }}
            >
              <Text style={{ fontSize: 20 }}>Tiếp</Text>
              <Entypo name="chevron-right" size={20} />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={{ height: 91 }}></View>
      </View>
    </PagerView>
  );
};

export default NewStories;

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'black',
    flex: 1
  },
  buttonClose: {
    fontSize: 32,
    color: 'white'
  },
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
