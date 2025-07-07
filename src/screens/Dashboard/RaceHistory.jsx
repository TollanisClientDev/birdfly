import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import RaceHistoryComponent from '../../components/layouts/RaceHistoryComponent';

const RideHistoryData = [
  {
    provider: 'Little Bird',
    from: 'Location 1',
    to: 'Location 2',
    startTime: '8:40 AM',
    endTime: '9:30 AM',
    totalPaid: '$44.09',
    // Additional details for the complete view
    dateTime: 'Mar 24, 10:21 AM',
    tripAccepted: '8:35 AM',
    pickedUpPassenger: '8:40 AM',
    droppedOffPassenger: '9:30 AM',
    milesToPickup: '1.4 mi - 0:10',
    milesToDropoff: '30 mi - 50:00',
    totalPassengerPayment: '$55.50',
    passengerBookingFee: '$2.00',
    passengerPaymentToDriver: '$40.00',
    cardFee: '-$1.91',
    networkFee: '-$3.59',
    insurance: '-$2.00',
    driversGain: '$44.09',
  },
  {
    provider: 'Little Bird',
    from: 'Location 3',
    to: 'Location 4',
    startTime: '9:00 AM',
    endTime: '9:45 AM',
    totalPaid: '$50.00',
    // Additional details for the complete view
    dateTime: 'Mar 25, 11:00 AM',
    tripAccepted: '8:55 AM',
    pickedUpPassenger: '9:00 AM',
    droppedOffPassenger: '9:45 AM',
    milesToPickup: '2 mi - 0:15',
    milesToDropoff: '25 mi - 45:00',
    totalPassengerPayment: '$60.50',
    passengerBookingFee: '$2.50',
    passengerPaymentToDriver: '$45.00',
    cardFee: '-$1.00',
    networkFee: '-$3.00',
    insurance: '-$2.00',
    driversGain: '$48.00',
  },
];
const RaceHistory = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <RaceHistoryComponent
        navigation={navigation}
        rideHistoryData={RideHistoryData}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
export default RaceHistory;
