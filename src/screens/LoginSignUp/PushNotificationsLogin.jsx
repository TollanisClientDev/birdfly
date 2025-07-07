import {SafeAreaView} from 'react-native';
import React from 'react';
import {
  PushNotificationsLoginLogo,
  PushNotificationsLoginCaption,
} from '../../components/layouts/PushNotificationsLoginComponent';

const PushNotificationsLogin = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <PushNotificationsLoginLogo
        text={'Get Push Notifications'}
        subheadingtext={
          'We use push notifications to send you exclusive travel updates, offers and promotion.'
        }
        navigator={navigation}
      />
      <PushNotificationsLoginCaption
        subheadingtext={
          'We use push notifications to send you exclusive travel updates, offers and promotion.'
        }
      />
    </SafeAreaView>
  );
};

export default PushNotificationsLogin;
