import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {CodeVerificationSubHeading} from '../../components/layouts/CodeVerificationComponent';
import BackButton from '../../components/common/BackButtonComponent';

const CodeVerification = ({navigation, route}) => {
  const {
    isSignUp,
    phoneNumber,
    email,
    otpLength = 4,
    redirectScreen,
  } = route.params;

  const inputRefs = useRef([]);
  if (inputRefs.current.length !== otpLength) {
    inputRefs.current = Array.from({length: otpLength}, () =>
      React.createRef(),
    );
  }

  const [otpValues, setOtpValues] = useState(Array(otpLength).fill(''));
  const [timer, setTimer] = useState(40);
  const [resendDisabled, setResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTimer(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleResendCode = () => {
    setOtpValues(Array(otpLength).fill(''));
    setTimer(40);
    setResendDisabled(true);
    setTimeout(() => {
      inputRefs.current[0]?.current?.focus();
    }, 100);
    Alert.alert(
      'Code Resent',
      `A new code has been sent to ${phoneNumber || email}.`,
    );
  };

  const handleVerifyCode = () => {
    if (otpValues.includes('')) {
      Alert.alert('Error', 'Please enter the complete verification code.');
      return;
    }

    // Validate digits only
    for (let v of otpValues) {
      if (!/^[0-9]$/.test(v)) {
        Alert.alert(
          'Invalid Character',
          'Only numeric digits are allowed in the code.',
        );
        return;
      }
    }

    const otp = otpValues.join('');
    console.log('Entered OTP:', otp);

    if (otp === '1234') {
      navigation.navigate(redirectScreen, {fromVerification: true});
    } else {
      Alert.alert('Invalid Code', 'The code you entered is incorrect.');
    }
  };

  const handleInputChange = (index, text) => {
    const digit = text.replace(/[^0-9]/g, '');
    const updated = [...otpValues];
    updated[index] = digit;
    setOtpValues(updated);

    if (digit) {
      if (index < otpLength - 1) {
        inputRefs.current[index + 1].current.focus();
      }
    } else {
      if (index > 0) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled">
          <BackButton onPress={() => navigation.goBack()} />

          <Text style={styles.title}>Verification Code</Text>
          <CodeVerificationSubHeading
            message={
              isSignUp
                ? 'Enter the code sent to verify your account'
                : 'Enter the code to continue'
            }
          />

          <View style={styles.codeView}>
            {otpValues.map((val, i) => (
              <TextInput
                key={i}
                ref={inputRefs.current[i]}
                style={[
                  styles.inputView,
                  {borderColor: val ? '#302A95' : '#302A95'},
                ]}
                keyboardType="number-pad"
                maxLength={1}
                value={val}
                onChangeText={text => handleInputChange(i, text)}
              />
            ))}
          </View>

          <Pressable style={styles.verifyCodeButton} onPress={handleVerifyCode}>
            <Text style={styles.btnTxt}>Next</Text>
          </Pressable>

          <View style={styles.resendContainer}>
            <Pressable
              style={[
                styles.resendCodeButton,
                !resendDisabled && styles.resendCodeButtonEnabled,
              ]}
              disabled={resendDisabled}
              onPress={handleResendCode}>
              <Text
                style={[
                  styles.resendText,
                  !resendDisabled && styles.resendTextEnabled,
                ]}>
                Resend Code
              </Text>
            </Pressable>
            {resendDisabled && (
              <Text style={styles.timerText}>
                <Text style={styles.timerBold}>
                  00:{timer < 10 ? '0' : ''}
                  {timer}
                </Text>{' '}
                Please wait to send a new code
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  codeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#3F35CE',
    marginTop: 80,
    marginBottom: 10,
  },
  inputView: {
    height: 50,
    width: 50,
    borderRadius: 10,
    borderWidth: 1,
    color: '#3F35CE',
    textAlign: 'center',
    fontSize: 20,
    margin: 10,
  },
  verifyCodeButton: {
    width: '90%',
    height: 55,
    backgroundColor: '#3F35CE',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  btnTxt: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resendCodeButton: {
    width: '90%',
    height: 55,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  resendCodeButtonEnabled: {
    borderColor: '#3F35CE',
  },
  resendText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
  },
  resendTextEnabled: {
    color: '#3F35CE',
  },
  timerText: {
    marginTop: 10,
    color: '#3F35CE',
    textAlign: 'center',
  },
  timerBold: {
    fontWeight: 'bold',
  },
});

export default CodeVerification;
