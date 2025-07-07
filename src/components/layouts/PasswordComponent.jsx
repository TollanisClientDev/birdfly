import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';

const {width, height} = Dimensions.get('window');

const PasswordHeading = () => (
  <View>
    <Text style={styles.heading}>Password</Text>
  </View>
);

const PasswordInput = ({value, onChangeText, placeholder}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.inputContainer}>
      <Image
        source={require('../../assets/images/lock_button.png')}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={!passwordVisible}
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
      <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
        <Image
          source={
            passwordVisible
              ? require('../../assets/images/password_visible.png') // Eye open
              : require('../../assets/images/password_visible.png') // Eye closed
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const ForgotPassword = ({onPress}) => (
  <View style={styles.forgotPasswordContainer}>
    <Text style={styles.forgotPasswordText}>Forgot your password? </Text>
    <Pressable onPress={onPress}>
      <Text style={styles.forgotPasswordLink}>Reset now</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 180,
    marginBottom: 40,
    color: '#3F35CE',
    fontSize: 35,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#3F35CE',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginVertical: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  forgotPasswordContainer: {
    position: 'absolute',
    bottom: 40, // Adjust as needed
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#555',
  },
  forgotPasswordLink: {
    fontSize: 16,
    color: '#3F35CE',
    fontWeight: 'bold',
  },
});

export {PasswordHeading, PasswordInput, ForgotPassword};
