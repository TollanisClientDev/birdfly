import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import TurnOnLocationComponent from '../components/layouts/TurnOnLocationComponent';
const TurnOnLocation = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <TurnOnLocationComponent navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});
export default TurnOnLocation;
