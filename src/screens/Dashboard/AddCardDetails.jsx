import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import AddCardDetailsComponent from '../../components/layouts/AddCardDetailsComponent';
const AddCardDetails = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <AddCardDetailsComponent navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
export default AddCardDetails;
