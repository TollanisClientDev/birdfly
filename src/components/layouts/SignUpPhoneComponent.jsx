import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  TextInput,
} from 'react-native';
import BackButton from '../common/BackButtonComponent';
import {InputFromUser} from '../layouts/LoginComponent';

const {width} = Dimensions.get('window');

const SignUpPhoneComponent = ({navigation}) => {
  const [activeTab, setActiveTab] = useState('Phone');
  const [inputValue, setInputValue] = useState('');

  const validateEmail = email =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleNextPress = () => {
    if (activeTab === 'Phone') {
      if (inputValue.length >= 7 && inputValue.length <= 15) {
        navigation.navigate('CodeVerification', {
          isSignUp: true,
          phoneNumber: inputValue,
          email: null,
          otpLength: 4,
          redirectScreen: 'PushNotificationsLogin',
        });
      } else {
        Alert.alert(
          'Invalid Phone Number',
          'Please enter a valid phone number.',
        );
      }
    } else if (activeTab === 'Email') {
      if (validateEmail(inputValue)) {
        navigation.navigate('CodeVerification', {
          isSignUp: true,
          email: inputValue,
          phoneNumber: null,
          otpLength: 4,
          redirectScreen: 'PushNotificationsLogin',
        });
      } else {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Content Section */}
      <View style={styles.contentWrapper}>
        {/* Back Button */}
        <View style={styles.backButtonContainer}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>

        {/* Illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/bird_phone_hand.png')}
            style={styles.image}
          />
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Phone' && styles.activeTabButton,
            ]}
            onPress={() => {
              setActiveTab('Phone');
              setInputValue('');
            }}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Phone' && styles.activeTabText,
              ]}>
              Phone
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === 'Email' && styles.activeTabButton,
            ]}
            onPress={() => {
              setActiveTab('Email');
              setInputValue('');
            }}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'Email' && styles.activeTabText,
              ]}>
              E-mail
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Field */}
        <View style={styles.inputContainer}>
          {activeTab === 'Phone' ? (
            <InputFromUser
              setInputValue={setInputValue}
              phoneNumberOrEmail={inputValue}
            />
          ) : (
            <TextInput
              style={styles.emailInput}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={inputValue}
              onChangeText={setInputValue}
            />
          )}
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Section */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 5,
    left: 15,
    zIndex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 5,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#3F35CE',
    borderRadius: 8,
  },
  tabText: {
    fontSize: 16,
    color: '#3F35CE',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 15,
    marginBottom: 20,
  },
  emailInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    height: 50,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#E7E5EA',
  },
  nextButton: {
    backgroundColor: '#3F35CE',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#A0A0A0',
    fontSize: 14,
  },
  loginText: {
    color: '#3F35CE',
    fontWeight: 'bold',
  },
});

export default SignUpPhoneComponent;
