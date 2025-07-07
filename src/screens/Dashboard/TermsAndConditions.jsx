import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import TermsAndConditionsComponent from '../../components/layouts/TermsAndConditionsComponents';

const TermsAndConditions = ({navigation, route}) => {
  console.log('TermsAndConditions', route.params);
  return (
    <SafeAreaView style={styles.container}>
      <TermsAndConditionsComponent
        navigator={navigation}
        showBottomButtons={route.params.showBottomButtons}
        checkboxText={route.params.checkboxText}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});

export default TermsAndConditions;
