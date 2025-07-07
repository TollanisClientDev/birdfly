import {View, Text, SafeAreaView, Pressable, Alert} from 'react-native';
import React, {useState} from 'react';
import {
  PasswordHeading,
  PasswordInput,
  ForgotPassword,
} from '../components/layouts/PasswordComponent';
import {ForgotPasswordNextButton} from '../components/common/Buttons';

const Password = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleNext = ({navigation}) => {
    if (password === '' || confirmPassword === '') {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }
    if (password === confirmPassword) {
      // Navigate to the next component if passwords match
      navigation.navigate('PushNotificationsLogin');
    } else {
      Alert.alert('Error', 'Passwords do not match. Please try again.');
    }
  };
  return (
    <SafeAreaView>
      <PasswordHeading />
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
      />
      <PasswordInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm Password"
      />
      {/* <ForgotPassword onPress={() => alert('Reset Password Clicked!')} /> */}
      <ForgotPasswordNextButton
        text="Log in"
        onPress={() => handleNext({navigation})}
      />
    </SafeAreaView>
  );
};

export default Password;
