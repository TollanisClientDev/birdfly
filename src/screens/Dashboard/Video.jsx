import {SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import VideoComponent from '../../components/layouts/VideoComponent';
const {width, height} = Dimensions.get('window');

const Video = ({navigation}) => {
  return (
    <SafeAreaView style={styles.background}>
      <VideoComponent navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
    justifyContent: 'space-between',
  },
});
export default Video;
