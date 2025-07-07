import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginSocialMedia} from '../common/Buttons';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {GOOGLE_AUTH_CLIENT_ID} from '../../utils/Constants';
import BackButton from '../common/BackButtonComponent';

const {width} = Dimensions.get('window');

const SignUpSwitchComponent = ({navigation}) => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo?.idToken) {
        await AsyncStorage.setItem('UserToken', userInfo.idToken);
        navigation.navigate('Home');
      } else {
        console.warn('No token received');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.warn('Login Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.warn('Login in progress');
      } else {
        console.warn('Login Error:', error.message);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackButton onPress={() => navigation.goBack()} />
      <View style={styles.contentWrapper}>
        <Image
          source={require('../../assets/images/bird_phone_hand.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupButtonText}>
            Sign up with Phone or Email
          </Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <LoginSocialMedia extrastyles={styles.googleButton} onPress={signIn} />
      </View>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate('Login')}>
          Log In
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default SignUpSwitchComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  contentWrapper: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    alignSelf: 'center',
    marginBottom: 40,
  },
  signupButton: {
    backgroundColor: '#3F35CE',
    paddingVertical: 20,
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 30,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#888',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3F35CE',
    paddingVertical: 16,
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#f1f1f1',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  loginLink: {
    color: '#3F35CE',
    fontWeight: '500',
  },
});
