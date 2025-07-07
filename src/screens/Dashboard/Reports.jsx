import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import ReportsComponent from '../../components/layouts/ResportsComponent';

const Reports = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ReportsComponent navigation={navigation} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f3ff',
  },
});
export default Reports;
