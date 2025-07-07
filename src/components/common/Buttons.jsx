import {Text, Pressable, StyleSheet, Image, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const LoginButton = ({press}) => {
  return (
    <>
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: '#B7D9EC',
            marginTop: 30,
            paddingHorizontal: 22,
            paddingVertical: 10,
          },
        ]}
        onPress={press}>
        <Text style={{alignSelf: 'center', color: '#3F35CE', fontWeight: 700}}>
          Log in
        </Text>
      </Pressable>
    </>
  );
};

const SignupButton = ({press}) => {
  return (
    <>
      <Pressable
        style={[
          styles.button,
          {
            backgroundColor: '#302A95',
            marginTop: 10,
            paddingHorizontal: 22,
            paddingVertical: 10,
          },
        ]}
        onPress={press}>
        <Text style={{alignSelf: 'center', color: '#FFFFFF', fontWeight: 700}}>
          Sign up
        </Text>
      </Pressable>
    </>
  );
};

const LoginNextButton = ({press, styling = {}}) => {
  return (
    <>
      <Pressable
        style={[
          styles.buttonnext,
          {
            backgroundColor: '#3F35CE',
            position: 'absolute',
            bottom: height * 0.01,
            alignSelf: 'center',
            width: width * 0.9, // 90% of screen width
          },
          styling,
        ]}
        onPress={press}>
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 15,
            color: '#fff',
            fontFamily: 'Parkinsons-Medium',
          }}>
          Next
        </Text>
      </Pressable>
    </>
  );
};

const LoginSocialMedia = ({onPress, extrastyles}) => {
  return (
    <Pressable
      style={[styles.socialbutton, {backgroundColor: '#EEEEEE'}, extrastyles]}
      onPress={onPress}>
      <Image
        source={require('../../assets/images/google_logo.png')}
        style={styles.icon}
      />
      <Text
        style={{
          fontFamily: 'Parkinsons-Medium',
          color: '#3F35CE',
          fontSize: 16,
        }}>
        Sign up with Google
      </Text>
    </Pressable>
  );
};

const ResendCodeButton = ({onPress, imageSource, text}) => {
  return (
    <Pressable style={styles.resendButton} onPress={onPress}>
      <Text style={styles.resendText}>{text}</Text>
    </Pressable>
  );
};
const ResendButtonDynamic = ({onPress, text, disabled}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.resendButton,
        disabled ? styles.buttonDisabledResend : styles.buttonEnabledResend,
      ]}>
      <Text style={styles.buttonTextResend}>{text}</Text>
    </Pressable>
  );
};

const ForgotPasswordNextButton = ({onPress, text}) => {
  return (
    <Pressable style={styles.forgotPasswordNextButton} onPress={onPress}>
      <Text style={{color: 'white'}}>{text}</Text>
    </Pressable>
  );
};

const DriverCodeButton = ({onPress, text}) => {
  return (
    <Pressable
      style={[styles.driverCodeSubmit, {position: 'absolute'}]}
      onPress={onPress}>
      <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
        {text}
      </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    width: '75%',
    height: '15%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonnext: {
    width: '90%',
    height: '60',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  socialbutton: {
    width: '90%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 15,
    borderColor: '#3F35CE',
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderColor: '#3F35CE',
    paddingVertical: 16,
    borderRadius: 15,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  icon: {
    width: 10,
    height: 10,
    marginRight: 10,
  },

  resendButton: {
    flexDirection: 'row',
    width: '90%',
    height: 55,
    backgroundColor: '#3F35CE',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
    backgroundColor: '#fff',
    borderColor: '#3F35CE',
    borderWidth: 1,
    marginTop: 20,
  },
  resendIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  resendText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  forgotPasswordNextButton: {
    flexDirection: 'row',
    width: '90%',
    height: 55,
    backgroundColor: '#3F35CE',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F35CE',
    color: '#000',
    borderWidth: 1,
    marginTop: 5,
  },
  driverCodeSubmit: {
    position: 'absolute',
    bottom: 20, // Adjust for spacing from the bottom
    width: '80%',
    backgroundColor: '#3F35CE',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonResend: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
  },
  buttonDisabledResend: {
    backgroundColor: '#fff',
    borderColor: '#3F35CE',
    opacity: 0.5,
  },
  buttonEnabledResend: {
    backgroundColor: '#EEEFF2',
    borderColor: '#3F35CE',
    color: 'white',
    opacity: 1,
  },
  buttonTextResend: {
    fontFamily: 'Parkinsons-Medium',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F35CE',
  },
});

export {
  LoginButton,
  SignupButton,
  LoginNextButton,
  LoginSocialMedia,
  ResendCodeButton,
  DriverCodeButton,
  ForgotPasswordNextButton,
  ResendButtonDynamic,
};
