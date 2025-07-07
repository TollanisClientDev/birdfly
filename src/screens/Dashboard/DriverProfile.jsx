import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useRoute} from '@react-navigation/native';
import DriverProfileComponent from '../../components/layouts/DriverProfileComponent';
const DriverProfile = ({navigation}) => {
  const route = useRoute();
  const {isDriver} = route.params ?? {};
  console.log('DriverProfile rendered with isDriver:', isDriver);
  return (
    <SafeAreaView style={styles.container}>
      <DriverProfileComponent navigation={navigation} isDriver={isDriver} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});

export default DriverProfile;
