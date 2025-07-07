import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import PhoneInput from 'react-native-international-phone-number';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputFromUser = ({phoneNumberOrEmail, setInputValue}) => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleInputValue = phoneNumber => {
    setInputValue(phoneNumber);
  };

  const handleSelectedCountry = country => {
    setSelectedCountry(country);
  };

  return (
    <View style={styles.inputFromUserWrapper}>
      <PhoneInput
        placeholder="(000) 000-0000"
        defaultCountry="US"
        value={phoneNumberOrEmail}
        onChangePhoneNumber={handleInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
        color="#3F35CE"
        textInputStyle={{color: '#3F35CE'}}
        customCaret={<Icon name="chevron-down" size={20} color="#3F35CE" />}
        phoneInputStyles={{
          callingCode: {
            fontSize: 16,
            color: '#3F35CE',
          },
          container: {
            backgroundColor: '#E7E5EA',
            borderWidth: 0,
          },
        }}
      />
    </View>
  );
};

const ORComponent = () => (
  <View style={[styles.orContainer, {marginTop: 20}]}>
    <View style={styles.line} />
    <Text style={styles.orText}> or </Text>
    <View style={styles.line} />
  </View>
);

const SignupLink = ({onPress}) => (
  <View style={styles.signupWrapper}>
    <View style={styles.SignUpContainer}>
      <Text style={styles.text}>Don't have an account? </Text>
      <Pressable onPress={onPress}>
        <Text style={styles.SignUpText}>Sign Up</Text>
      </Pressable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  inputFromUserWrapper: {
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    height: 62,
  },
  orContainer: {
    width: '100%',
    height: 60,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 16,
    opacity: 0.5,
    fontFamily: 'Parkinsons-Medium',
    fontWeight: 'bold',
  },
  signupWrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  SignUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Parkinsons-Medium',
    fontWeight: 'bold',
    opacity: 0.5,
  },
  SignUpText: {
    fontFamily: 'Parkinsons-Medium',
    fontSize: 16,
    color: '#3F35CE',
  },
});

export {InputFromUser, ORComponent, SignupLink};
