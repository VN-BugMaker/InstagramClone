import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useState } from 'react';

const NextStories = ({ navigation, route }) => {
  const { data } = route.params;
  const [images, setImages] = useState();
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  console.log(data[0].imagesUrl);
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 45,
            height: 45,
            borderRadius: 45,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(68,68,68,0.6)',
            position: 'absolute',
            top: 15,
            marginHorizontal: 10,
            zIndex: 1
          }}
        >
          <AntDesign name="left" size={23} color={'white'} />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: images ? images : data[0].imagesUrl
        }}
        style={{
          width: width,
          height: 750,
          resizeMode: 'contain'
        }}
      />

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
        {data.map((i, index) => {
          return (
            <TouchableOpacity
              onPress={() => setImages(i.imagesUrl)}
              key={index}
            >
              <Image
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
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
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
    </View>
  );
};

export default NextStories;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1
  }
});
