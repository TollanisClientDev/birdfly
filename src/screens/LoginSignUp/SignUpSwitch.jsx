import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import SignUpSwitchComponent from '../../components/layouts/SignUpSwitchComponent';

const SignUpSwitch = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <SignUpSwitchComponent navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default SignUpSwitch;
