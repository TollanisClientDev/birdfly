import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import SettingsComponent from '../../components/layouts/SettingsComponent';

const Settings = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <SettingsComponent navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
export default Settings;
