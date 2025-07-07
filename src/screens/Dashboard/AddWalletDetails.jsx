import React from 'react';
import {View, StyleSheet} from 'react-native';
import AddWalletDetailsComponent from '../../components/layouts/AddWalletDetailsComponent';

const MockData = {
  birdCoin: {
    balance: 126.5,
    enabled: true,
  },
  cards: [
    {id: '1', type: 'Credit Card', last4: '2128', selected: false},
    {id: '2', type: 'Credit Card', last4: '2244', selected: true},
    {id: '3', type: 'Credit Card', last4: '2244', selected: false},
  ],
  applePay: {
    enabled: true,
    selected: false,
  },
};

const AddWalletDetails = ({navigation, route}) => {
  const isFromDashboard = route.params?.isFromDashboard ?? false; // Retrieve isFromDashboard from route.params

  return (
    <View style={styles.container}>
      <AddWalletDetailsComponent
        data={MockData}
        isFromDashboard={isFromDashboard}
      />
    </View>
  );
};

export default AddWalletDetails;

const styles = StyleSheet.create({
  container: {flex: 1, top: 50},
});
