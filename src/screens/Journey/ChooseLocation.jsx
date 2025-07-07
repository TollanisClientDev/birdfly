import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import ChooseLocationComponent from '../../components/layouts/ChooseLocationComponent';

const ChooseLocation = ({navigation, route}) => {
  const isDirect = route.params?.isDirect ?? false;
  console.log('ChooseLocation rendered with isDirect:', isDirect);
  return (
    <SafeAreaView style={styles.container}>
      <ChooseLocationComponent navigator={navigation} isDirect={isDirect} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
export default ChooseLocation;
