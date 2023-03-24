import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { React, useRef, useState } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { useFonts } from 'expo-font';
import { Messenger_SVG, NewPost_SVG } from '../../svg-view';
import Stories from '../screenComponents/Stories';
import Posts from '../screenComponents/Posts';
import styles from '../../../assets/styles/styles';

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  };
  const [fontsLoaded] = useFonts({
    'Lobster-Regular': require('../../../assets/fonts/Lobster-Regular.ttf')
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        animated={true}
      />
      <View style={styles.headerWrap}>
        <Text style={styles.titleWrapper}>nokoSocial</Text>
        <View style={styles.titleWrapperRight}>
          <TouchableOpacity onPress={() => navigation.navigate('AddPost')}>
            <NewPost_SVG />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Message')}
            style={{ paddingLeft: 23 }}
          >
            <Messenger_SVG />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        refreshing={refreshing}
        onRefresh={onRefresh}
        // refreshControl={
        //   <RefreshControl   />
        // }
      >
        <View style={[styles.storyWrapper, { flex: 1 }]}>
          {/* <Stories /> */}
        </View>
        <Posts />
      </ScrollView>
    </View>
  );
};

export default Home;
