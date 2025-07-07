import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import BirdCoinPageComponent from '../../components/layouts/BirdCoinPageComponent';
const BirdCoinPage = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <BirdCoinPageComponent navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});
export default BirdCoinPage;
