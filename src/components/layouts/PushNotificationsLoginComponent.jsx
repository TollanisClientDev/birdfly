import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {LoginNextButton} from '../common/Buttons';
const {width, height} = Dimensions.get('window');

const PushNotificationsLoginLogo = ({text, subheadingtext, navigator}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/PushNotificationsLogin.png')}
        style={styles.logo}></Image>
      <Text
        style={{
          color: '#3F35CE',
          marginTop: 20,
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        {text}
      </Text>
      <Text
        style={{
          marginTop: 40,
          fontSize: 12,
          fontWeight: 'bold',
          width: '90%',
          textAlign: 'center',
        }}>
        {subheadingtext}
      </Text>
      <LoginNextButton
        press={() => {
          navigator.navigate('DriverCode');
        }}
      />
    </View>
  );
};

const PushNotificationsLoginCaption = ({text}) => {
  return (
    <View>
      <Text style={{color: '#3F35CE'}}>{text} </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    marginTop: -20,
  },
  logo: {
    width: 255, // Set image width
    height: 208, // Set image height
    resizeMode: 'contain', // Ensures the image scales properly
  },
});
export {PushNotificationsLoginLogo, PushNotificationsLoginCaption};
