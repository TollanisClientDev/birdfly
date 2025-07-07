import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import DriverCodeComponent from '../components/layouts/DriverCodeComponent';

const DriverCode = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <DriverCodeComponent navigator={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // paddingHorizontal: 20,
    // paddingTop: 50,
    alignItems: 'center',
  },
});
export default DriverCode;
