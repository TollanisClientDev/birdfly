import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import CreateAccountComponent from '../components/layouts/CreateAccountComponent';
const CreateAccount = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <CreateAccountComponent navigator={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
});

export default CreateAccount;
