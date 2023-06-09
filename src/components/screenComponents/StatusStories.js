import { View, Text, Image, StatusBar, TextInput } from 'react-native';
import React from 'react';

const Status = ({ route, navigation }) => {
  const { name, image } = route.params;
  return (
    <View
      style={{
        backgroundColor: '#000000',
        height: '100%'
      }}
    >
      <StatusBar hidden={false} backgroundColor="#000000" barStyle="white" />
      <Image
        source={image}
        style={{
          resizeMode: 'cover',
          width: '100%',
          height: '84%',
          marginTop: '10%'
        }}
      />
      <TextInput
        style={{
          height: 43,
          width: 271,
          borderRadius: 20,
          borderStyle: 'solid',
          borderWidth: 1,
          backgroundColor: '#666666'
        }}
      ></TextInput>
    </View>
  );
};

export default Status;
