import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import NotificationComponent from '../components/layouts/NotificationComponent';
const Notifications = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <NotificationComponent navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 16,
  },
});
export default Notifications;
