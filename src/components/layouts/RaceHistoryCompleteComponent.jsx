import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const {width} = Dimensions.get('window');
import BackButtonWithHeader from '../common/BackButtonWithHeader';
const RaceHistoryCompleteComponent = ({route, navigation}) => {
  const {trip} = route.params;

  const tripSteps = [
    {
      label: 'Trip Accepted',
      time: trip.tripAccepted,
      icon: 'radio-button-off-outline',
    },
    {
      label: 'Picked up passenger',
      time: trip.pickedUpPassenger,
      icon: 'radio-button-off-outline',
    },
    {
      label: 'Dropped Off Passenger',
      time: trip.droppedOffPassenger,
      icon: 'radio-button-on-outline',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <BackButtonWithHeader
        Heading={trip.dateTime}
        onBackPress={() => navigation.goBack()}
      />
      {/* <View style={styles.headerContainer}>
        <Text style={styles.dateTime}>{}</Text>
        <View style={{width: 24}} />
      </View> */}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <Text style={styles.mapText}>[ Map Placeholder ]</Text>
        </View>

        {/* Send by email */}
        <Pressable
          style={styles.sendByEmailButton}
          onPress={() => Alert.alert('Send by email pressed')}>
          <View style={styles.emailIconWrapper}>
            <Icon name="mail-outline" size={20} color="#FFF" />
          </View>
          <Text style={styles.sendByEmailText}>Send by email</Text>
        </Pressable>

        {/* Trip Route */}
        <View style={styles.tripRouteContainer}>
          <Text style={styles.sectionTitle}>Trip Route</Text>

          {tripSteps.map((step, index) => {
            const isLast = index === tripSteps.length - 1;
            return (
              <View key={index} style={styles.stepRow}>
                {/* icon + vertical line */}
                <View style={styles.iconColumn}>
                  <Icon name={step.icon} size={20} color="#3E35CE" />
                  {!isLast && <View style={styles.verticalLine} />}
                </View>

                {/* label */}
                <Text style={styles.tripLabel}>{step.label}</Text>

                {/* time */}
                <Text style={styles.tripTime}>{step.time}</Text>
              </View>
            );
          })}

          {/* Miles & Time */}
          <Text style={styles.milesTitle}>
            Miles | Time to pick up the passenger
          </Text>
          <Text style={styles.milesValue}>{trip.milesToPickup}</Text>

          <Text style={styles.milesTitle}>
            Miles | Time to drop off the passenger
          </Text>
          <Text style={styles.milesValue}>{trip.milesToDropoff}</Text>
        </View>
        {/* Payment Section */}
        <View style={styles.paymentSection}>
          <Text style={[styles.sectionTitle, {marginBottom: 4}]}>Payment</Text>
          <Text style={styles.paymentSubText}>
            Full transparency in payment
          </Text>

          {[
            ['Total Passenger Payment', trip.totalPassengerPayment],
            ['Passenger booking fee', trip.passengerBookingFee],
            ['Passenger payment to driver', trip.passengerPaymentToDriver],
            ['Card Fee', trip.cardFee],
            ['Network Fee', trip.networkFee],
            ['Insurance', trip.insurance],
          ].map(([label, value], i) => {
            const isBookingFee = label === 'Passenger booking fee';
            return (
              <View key={i} style={[styles.paymentRow, {marginVertical: 10}]}>
                <Text
                  style={[
                    styles.paymentLabel,
                    isBookingFee && {color: '#7B7B7B'},
                  ]}>
                  {label}
                </Text>
                <Text
                  style={[
                    styles.paymentValue,
                    isBookingFee && {color: '#7B7B7B'},
                  ]}>
                  {value}
                </Text>
              </View>
            );
          })}

          {/* Divider */}
          <View style={styles.divider} />

          {/* Calculate Driver's Gain */}
          <View style={[styles.paymentRow, {marginTop: 14}]}>
            <Text style={[styles.paymentLabel, {fontWeight: 'bold'}]}>
              Driver&apos;s gain
            </Text>
            <Text style={[styles.paymentValue, {fontWeight: 'bold'}]}>
              {`$${[
                trip.totalPassengerPayment,
                `-${trip.passengerBookingFee}`,
                `-${trip.cardFee}`,
                `-${trip.networkFee}`,
                `-${trip.insurance}`,
              ]
                .map(value => parseFloat(value.replace('$', '')) || 0) // Remove $ and convert to number
                .reduce((acc, curr) => acc + curr, 0) // Perform addition/subtraction
                .toFixed(2)}`}{' '}
              {/* Round to 2 decimal places */}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RaceHistoryCompleteComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 50,
    marginHorizontal: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
  },

  dateTime: {
    fontSize: 16,
    color: '#3F35CE',
    fontWeight: '600',
  },
  mapContainer: {
    width,
    height: 200,
    backgroundColor: '#ddd',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  mapText: {
    color: '#888',
  },
  sendByEmailButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginVertical: 25,
  },
  emailIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6538B5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  sendByEmailText: {
    color: '#6538B5',
    fontSize: 14,
    fontWeight: '400',
  },

  // Trip Route
  tripRouteContainer: {
    marginBottom: 10,
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#F2F1FF',
    padding: 20, // adds spacing inside without altering the text style
  },
  sectionTitle: {
    fontSize: 16,
    color: '#6538B5',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start', // align items to top so line starts under icon
  },
  iconColumn: {
    width: 24,
    alignItems: 'center',
  },
  verticalLine: {
    width: 3,
    height: 40, // fixed height for visibility
    backgroundColor: '#3E35CE',
  },
  tripLabel: {
    flex: 1,
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
    marginTop: 2, // nudge into vertical center
  },
  tripTime: {
    width: 60,
    fontSize: 14,
    color: '#000',
    textAlign: 'right',
    marginTop: 2, // align with label
  },
  milesTitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 2,
    marginTop: 8,
  },
  milesValue: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },

  // Payment
  paymentSection: {
    marginBottom: 20,
    backgroundColor: '#F2F1FF',
    padding: 20, // adds spacing inside without altering the text style
  },
  paymentSubText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#333',
  },
  paymentValue: {
    fontSize: 14,
    color: '#333',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#A6A6A6',
    marginVertical: 12, // Adds spacing above and below the line
  },
});
