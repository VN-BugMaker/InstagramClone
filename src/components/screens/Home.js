import { View, Text, StatusBar } from 'react-native';
import { React } from 'react';
import { ScrollView } from 'react-native-virtualized-view';
import { useFonts } from 'expo-font';
import { Messenger_SVG, NewPost_SVG } from '../../svg-view';
import Stories from '../screenComponents/Stories';
import Posts from '../screenComponents/Posts';
import styles from '../../../assets/styles/styles';

const Home = () => {
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
        <Text style={styles.titleWrapper}>Instagram</Text>
        <View style={styles.titleWrapperRight}>
          <NewPost_SVG />
          <View style={{ paddingLeft: 23 }}>
            <Messenger_SVG />
          </View>
        </View>
      </View>
      <ScrollView>
        <View style={styles.storyWrapper}>
          <Stories />
        </View>
        <Posts />
      </ScrollView>
    </View>
  );
};

export default Home;
