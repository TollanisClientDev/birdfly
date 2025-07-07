import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import BackButtonComponent from '../common/BackButtonComponent';

const CreateAccountComponent = ({navigator}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [lineContainerWidth, setLineContainerWidth] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const validatePassword = pwd => ({
    length: pwd.length >= 8,
    numberOrSymbol: /[0-9!@#$%^&*(),.?":{}|<>]/.test(pwd),
    upperAndLower: /[a-z]/.test(pwd) && /[A-Z]/.test(pwd),
  });

  const passwordValidation = validatePassword(password);
  const passwordComplete =
    passwordValidation.length &&
    passwordValidation.numberOrSymbol &&
    passwordValidation.upperAndLower &&
    password === confirmPassword &&
    password.length > 0;

  const progressItems = [
    firstName.trim().length > 0,
    lastName.trim().length > 0,
    passwordComplete,
  ];
  const progressRatio =
    progressItems.filter(Boolean).length / progressItems.length;

  useEffect(() => {
    if (lineContainerWidth > 0) {
      Animated.timing(progressAnim, {
        toValue: progressRatio * lineContainerWidth,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [progressRatio, lineContainerWidth]);

  const allRulesMet = progressItems.every(Boolean);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.container}>
          <BackButtonComponent onPress={() => navigator.goBack()} />

          <Text style={styles.title}>Now, create an account</Text>

          <View style={styles.progressContainer}>
            {progressItems.map((item, index) => (
              <React.Fragment key={index}>
                <View style={[styles.progressDot, item && styles.activeDot]} />
                {index < progressItems.length - 1 && (
                  <View
                    style={[
                      styles.progressLine,
                      progressItems[index] &&
                        progressItems[index + 1] &&
                        styles.activeLine,
                    ]}
                  />
                )}
              </React.Fragment>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#aaa"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#aaa"
            value={lastName}
            onChangeText={setLastName}
          />

          <View style={styles.passwordContainer}>
            <Image
              style={styles.lockIcon}
              source={require('../../assets/images/password_lock.png')}
            />
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              accessibilityLabel={
                passwordVisible ? 'Hide password' : 'Show password'
              }>
              <Image
                style={styles.eyeIcon}
                source={require('../../assets/images/close_eye.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.passwordContainer}>
            <Image
              style={styles.lockIcon}
              source={require('../../assets/images/password_lock.png')}
            />
            <TextInput
              style={styles.passwordInput}
              placeholder="Confirm Password"
              secureTextEntry={!confirmPasswordVisible}
              placeholderTextColor="#aaa"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              accessibilityLabel={
                confirmPasswordVisible
                  ? 'Hide confirm password'
                  : 'Show confirm password'
              }>
              <Image
                style={styles.eyeIcon}
                source={require('../../assets/images/close_eye.png')}
              />
            </TouchableOpacity>
          </View>

          <View
            style={styles.animatedLineContainer}
            onLayout={e => setLineContainerWidth(e.nativeEvent.layout.width)}>
            <Animated.View
              style={[
                styles.animatedLineFill,
                {
                  width: progressAnim,
                  backgroundColor: progressRatio === 1 ? 'green' : 'red',
                },
              ]}
            />
          </View>

          <View style={styles.rulesContainer}>
            <Text
              style={[
                styles.rule,
                passwordValidation.length ? styles.valid : styles.invalid,
              ]}>
              ✅ At least 8 characters
            </Text>
            <Text
              style={[
                styles.rule,
                passwordValidation.numberOrSymbol
                  ? styles.valid
                  : styles.invalid,
              ]}>
              ✅ At least one number (0-9) or symbol
            </Text>
            <Text
              style={[
                styles.rule,
                passwordValidation.upperAndLower
                  ? styles.valid
                  : styles.invalid,
              ]}>
              ✅ Lowercase (a-z) and Uppercase (A-Z)
            </Text>
            <Text
              style={[
                styles.rule,
                passwordComplete ? styles.valid : styles.invalid,
              ]}>
              ✅ Passwords match and conditions met
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,
              allRulesMet ? {} : styles.disabledButton,
            ]}
            disabled={!allRulesMet}
            onPress={() => navigator.navigate('PushNotificationsLogin')}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {flex: 1},
  contentContainer: {paddingBottom: 40},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3F35CE',
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  progressDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  activeDot: {backgroundColor: '#3F35CE'},
  progressLine: {
    flex: 1,
    height: 6,
    marginHorizontal: 5,
    borderRadius: 3,
    backgroundColor: '#ddd',
  },
  activeLine: {backgroundColor: '#4F46E5'},
  input: {
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  lockIcon: {width: 18, height: 18, marginRight: 10},
  eyeIcon: {width: 18, height: 18, marginLeft: 10},
  animatedLineContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    marginVertical: 10,
    overflow: 'hidden',
  },
  animatedLineFill: {
    height: '100%',
    borderRadius: 4,
  },
  rulesContainer: {marginTop: 10},
  rule: {
    fontSize: 14,
    marginBottom: 3,
  },
  valid: {color: 'green'},
  invalid: {color: 'red'},
  loginButton: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {backgroundColor: '#aaa'},
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateAccountComponent;
