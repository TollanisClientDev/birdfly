import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const OTPTitleComponent = () => {
  return (
    <View>
      <Text style={styles.title}>OTP Verification</Text>
    </View>
  );
};

const CodeVerificationSubHeading = () => {
  return (
    <Text style={styles.codeVerificationSubheading}>
      Enter the 4 digits of the code that we send you by email or phone
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Parkinsons-Medium',
    marginTop: 100,
    alignSelf: 'center',
    color: '#6538B5',
  },
  codeVerificationSubheading: {
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: 'Parkinsons-Medium',
    fontSize: 14,
    width: '75%',
    textAlign: 'center',
  },
});

export {OTPTitleComponent, CodeVerificationSubHeading};
