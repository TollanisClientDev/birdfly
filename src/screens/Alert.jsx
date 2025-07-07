import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import AlertComponent from '../components/common/AlertComponent';

const Alert = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <AlertComponent navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4FA',
    alignItems: 'center',
  },
});
export default Alert;
