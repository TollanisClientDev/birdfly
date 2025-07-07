import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SignUpComponent from '../../components/layouts/SignUpComponent';
import SignUpPhoneComponent from '../../components/layouts/SignUpPhoneComponent';

const SignUp = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <SignUpPhoneComponent navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SignUp;
