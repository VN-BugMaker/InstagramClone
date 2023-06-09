import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import storyInfo from '../../data/infomation';
import InstaStory from 'react-native-insta-story';

const Stories = () => {
  const navigation = useNavigation();

  const data = [
    {
      user_id: 1,
      user_image:
        'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
      user_name: 'Ahmet Çağlar Durmuş',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
          swipeText: null
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg'
        },
        {
          story_id: 3,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg'
        }
      ]
    },
    {
      user_id: 2,
      user_image:
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      user_name: 'Test User',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU'
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg'
        },
        {
          story_id: 3,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg'
        }
      ]
    },
    {
      user_id: 3,
      user_image:
        'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
      user_name: 'Test User',
      stories: [
        {
          story_id: 1,
          story_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
          swipeText: ' ',
          onPress: () => console.log('1')
        },
        {
          story_id: 2,
          story_image:
            'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg'
        },
        {
          story_id: 3,
          story_image:
            'https://image.freepik.com/free-vector/universe-mobile-wallpaper-with-planets_79603-600.jpg'
        }
      ]
    }
  ];

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
          <LinearGradient
            colors={['#fcd184', '#FD1D1D', '#e66ede']}
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
              opacity: 0.5
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => navigation.navigate('NewStories')}>
        <View style={{ position: 'absolute', bottom: 18, left: 52, zIndex: 1 }}>
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

        <LinearGradient
          colors={['#ffffff', '#fff']}
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
            source={require('../../storage/images/chibi.png')}
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
            fontSize: 10
          }}
        >
          Your Story
        </Text>
      </TouchableOpacity>
      <InstaStory
        data={data}
        duration={10}
        customSwipeUpComponent={
          <View>
            <Text>Swipe</Text>
          </View>
        }
      />
    </View>
  );
};

export default Stories;
