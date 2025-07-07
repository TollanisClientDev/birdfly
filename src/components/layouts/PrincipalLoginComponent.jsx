import {Text, StyleSheet, Pressable, View, Image} from 'react-native';
import {LoginButton, SignupButton} from '../common/Buttons';

const PrincipalLoginComponent = ({navigator}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 300,
      }}>
      <Text style={styles.parkinsonsMedium}>
        Creating real connections for safer trips.
      </Text>
      <LoginButton
        press={() => {
          navigator.navigate('Login');
        }}
      />
      <SignupButton
        press={() => {
          navigator.navigate('SignUpSwitch');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  parkinsonsMedium: {
    fontFamily: 'Parkinsons-Medium',
    fontSize: 18,
    color: '#FFFFFF',
    justifyContent: 'center',
    textAlign: 'center',
    width: '70%',
  },
});
export default PrincipalLoginComponent;
