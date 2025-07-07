import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import BackButton from '../../components/common/BackButtonComponent';
import {
  InputFromUser,
  ORComponent,
  SignupLink,
} from '../../components/layouts/LoginComponent';
import {LoginSocialMedia} from '../../components/common/Buttons';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {GOOGLE_AUTH_CLIENT_ID} from '../../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState(0); // 0 = Phone, 1 = Email
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: GOOGLE_AUTH_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      AsyncStorage.setItem('UserToken', userInfo.data.idToken);
      navigation.navigate('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Login Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Login in progress');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  const handleNextPress = () => {
    if (selectedTab === 0) {
      const phone = inputValue.trim();
      const phoneRegex = /^[0-9]+$/;
      if (phone.length < 7) {
        Alert.alert(
          'Invalid Phone Number',
          'Please enter a valid phone number with 7 to 15 digits.' +
            phone.length,
        );
        return;
      }

      navigation.navigate('CodeVerification', {
        isSignUp: false,
        phoneNumber: phone,
        email: null,
        otpLength: 4,
        redirectScreen: 'Home',
      });
    } else {
      const email = inputValue.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }

      navigation.navigate('CodeVerification', {
        isSignUp: false,
        phoneNumber: null,
        email: email,
        otpLength: 4,
        redirectScreen: 'Home',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.cont}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}>
      <SafeAreaView style={styles.cont}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.backButtonContainer}>
            <BackButton onPress={() => navigation.goBack()} />
          </View>

          <Image
            source={require('../../assets/images/Modo_de_isolamento.png')}
            style={styles.image}
          />

          {/* Tabs */}
          <View style={styles.tabContainer}>
            {['Phone', 'E-mail'].map((label, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.tabButton,
                  selectedTab === idx && styles.tabButtonActive,
                ]}
                onPress={() => {
                  setSelectedTab(idx);
                  setInputValue(''); // Reset value on tab change
                }}>
                <Text
                  style={[
                    styles.tabText,
                    selectedTab === idx && styles.tabTextActive,
                  ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Conditional Input */}
          {selectedTab === 0 ? (
            <InputFromUser
              phoneNumberOrEmail={inputValue}
              setInputValue={setInputValue}
            />
          ) : (
            <View style={styles.inputFromUserWrapper}>
              <TextInput
                style={styles.emailInput}
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          )}

          {/* Next Button */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>

          <ORComponent />
          <LoginSocialMedia onPress={signIn} />
          <SignupLink onPress={() => navigation.navigate('SignUpSwitch')} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  image: {
    marginTop: 100,
    marginBottom: 30,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  tabContainer: {
    width: '90%',
    height: 60,
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: '#E7E5EA',
    marginBottom: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#3F35CE',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'Parkinsons-Medium',
    color: '#3F35CE',
  },
  tabTextActive: {
    color: '#fff',
  },
  inputFromUserWrapper: {
    width: '90%',
    marginTop: 10,
    alignSelf: 'center',
    height: 50,
    backgroundColor: '#E7E5EA',
    marginBottom: 12,
    justifyContent: 'center',
    borderRadius: 6,
  },
  emailInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  nextButton: {
    width: '90%',
    height: 55,
    backgroundColor: '#3F35CE',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
