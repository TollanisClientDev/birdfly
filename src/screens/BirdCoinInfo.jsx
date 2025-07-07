import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import BirdCoinInfoComponent from '../components/layouts/BirdCoinInfoComponent';

const BirdCoinInfo = () => {
  return (
    <SafeAreaView style={styles.container}>
      <BirdCoinInfoComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BirdCoinInfo;
