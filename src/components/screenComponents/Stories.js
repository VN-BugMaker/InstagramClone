import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import storyInfo from '../../data/infomation';

const Stories = () => {
  const navigation = useNavigation();
  const renderStoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.push('Status', {
            name: item.name,
            image: item.image
          })
        }
      >
        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: 8,
            position: 'relative'
          }}
        >
          {item.id == 0 ? (
            <View
              style={{ position: 'absolute', bottom: 18, right: 12, zIndex: 1 }}
            >
              <Entypo
                name="circle-with-plus"
                style={{
                  fontSize: 20,
                  color: '#3897F0',
                  backgroundColor: 'white',
                  borderRadius: 100
                }}
              />
            </View>
          ) : null}
          <LinearGradient
            colors={
              item.id == 0
                ? ['#ffffff', '#fff']
                : ['#fcd184', '#FD1D1D', '#e66ede']
            }
            start={{ x: 0.0, y: 1.2 }}
            end={{ x: 1.0, y: 1.0 }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 76,
              height: 76,
              borderRadius: 76 / 2,
              borderColor: '#fff',
              borderWidth: 1
            }}
          >
            <Image
              resizeMode="cover"
              source={item.image}
              style={{
                width: 70,
                height: 70,
                borderRadius: 70 / 2,
                borderColor: '#fff',
                borderWidth: 3,
                alignSelf: 'center'
              }}
            />
          </LinearGradient>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 10,
              opacity: item.id == 0 ? 1 : 0.5
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={storyInfo}
      renderItem={renderStoryItem}
      nestedScrollEnabled={true}
      keyExtractor={(item) => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Stories;
