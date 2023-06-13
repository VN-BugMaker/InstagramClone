import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';

const LoadPost = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Lottie
        source={require('../../../storage/images/animated/97194-loading.json')}
        style={{ height: 120, width: 120 }}
        autoPlay
        loop
        speed={2}
      />
    </View>
  );
};

export default LoadPost;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1,
    flex: 1
  }
});
