import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Modal,
  Platform,
} from 'react-native';
import DriverOnTheWayComponent from './DriverOnTheWayComponent';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DriveToSpecificCustomerComponent from './DriveToSpecificCustomerComponent';
import CarCard from './CarCardComponent';
import {BackButtonCircle} from '../common/BackButtonComponent';
import SearchingPopupComponent from './SearchingPopupComponent';

const {height} = Dimensions.get('window');

const otp = '1134';

const SelectCategory1Component = ({
  navigation,
  initialDriverView = false,
  isDirect,
  selectedCardFromWallet,
  applePaySelected,
}) => {
  const carCardsData = [
    {
      id: '1',
      image: require('../../assets/images/LittleBird.png'),
      carName: 'Little Bird',
      economyText: 'Economy',
      passengerCount: '4',
      price: '$12.84',
      carinfo: 'Affordable compact rides',
    },
    {
      id: '2',
      image: require('../../assets/images/XLBird.png'),
      carName: 'XL Bird',
      economyText: 'More Passengers',
      passengerCount: '7',
      price: '$27.00',
      carinfo: 'Comfortable SUVs',
    },
    {
      id: '3',
      image: require('../../assets/images/petbird.png'),
      carName: 'Pet Bird',
      economyText: 'With Pet',
      passengerCount: '4',
      price: '$28.30',
      carinfo: 'Ride with your furry ride',
    },
  ];

  const [driverView, setDriverView] = useState(initialDriverView);
  const [pickup, setPickup] = useState(null);
  const [dropOff, setDropoff] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(carCardsData[0]);
  const [showPopup, setShowPopup] = useState(false);
  const [infoPopupText, setInfoPopupText] = useState('');
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);

  React.useEffect(() => {
    const getValues = async () => {
      try {
        const pickupData = await AsyncStorage.getItem('pickup');
        const dropData = await AsyncStorage.getItem('drop');
        if (pickupData) setPickup(JSON.parse(pickupData));
        if (dropData) setDropoff(JSON.parse(dropData));
      } catch (error) {
        console.error('Error fetching AsyncStorage data:', error);
      } finally {
        setLoading(false);
      }
    };
    getValues();
  }, []);

  const isPaymentSelected = applePaySelected || selectedCardFromWallet;

  const handleSelectPress = () => {
    if (!isPaymentSelected) {
      setShowPaymentAlert(true);
      return;
    }
    setShowPopup(true);
  };

  const showOtp = driverView && !isDirect;

  const handleDriverOnTheWayComplete = () => {
    setDriverView(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.mapContainer,
          driverView && {height: height * 0.45 + 100},
        ]}>
        <BackButtonCircle onPress={() => navigation.goBack()} />
        <Text>Map Placeholder</Text>
        {showOtp && (
          <>
            <TouchableOpacity
              style={styles.alarmButton}
              onPress={() => navigation.navigate('Alert')}>
              <MaterialCommunityIcons
                name="alarm-light-outline"
                size={20}
                color="white"
              />
            </TouchableOpacity>
            <View style={styles.otpBox}>
              <Text style={styles.otpText}>{otp}</Text>
            </View>
          </>
        )}
      </View>

      {isDirect ? (
        <DriveToSpecificCustomerComponent
          navigation={navigation}
          selectedCar={selectedCar}
        />
      ) : !driverView ? (
        <View style={styles.selectionContainer}>
          <ScrollView
            style={styles.vehicleScroll}
            showsVerticalScrollIndicator={false}>
            {carCardsData.map(card => (
              <CarCard
                key={card.id}
                data={card}
                selected={selectedCar?.id === card.id}
                onPress={() => setSelectedCar(card)}
                onInfoPress={text => setInfoPopupText(text)}
              />
            ))}
          </ScrollView>

          <View style={styles.paymentContainer}>
            <View style={styles.paymentRow}>
              <TouchableOpacity
                style={styles.paymentInfo}
                onPress={() =>
                  navigation.navigate('AddWalletDetails', {
                    isFromDashboard: false,
                  })
                }>
                {applePaySelected ? (
                  <AntDesign name="apple1" size={24} color="#6538B5" />
                ) : (
                  <MaterialIcons name="credit-card" size={30} color="#6538B5" />
                )}
                <Text style={styles.paymentText}>
                  {applePaySelected
                    ? 'Apple Pay'
                    : selectedCardFromWallet
                      ? `****${selectedCardFromWallet.last4}`
                      : 'Select Payment'}
                </Text>
                <MaterialIcons name="chevron-right" size={24} color="#6538B5" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.selectButton,
                  !isPaymentSelected && {opacity: 0.5},
                ]}
                onPress={handleSelectPress}
                disabled={!isPaymentSelected}>
                <Text style={styles.selectButtonText}>Select</Text>
              </TouchableOpacity>
            </View>
          </View>

          <SearchingPopupComponent
            visible={showPopup}
            onComplete={() => {
              setShowPopup(false);
              setDriverView(true);
            }}
            onCancel={() => setShowPopup(false)}
          />

          <Modal visible={showPaymentAlert} transparent animationType="fade">
            <View style={styles.overlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.heading}>
                  Please select a payment method
                </Text>
                <TouchableOpacity
                  onPress={() => setShowPaymentAlert(false)}
                  style={styles.cancelButton}>
                  <Text style={styles.cancelText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}

      {showOtp && (
        <DriverOnTheWayComponent
          navigation={navigation}
          onComplete={handleDriverOnTheWayComplete}
        />
      )}

      <Modal visible={!!infoPopupText} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.heading}>About</Text>
            <Text style={styles.info}>{infoPopupText}</Text>
            <TouchableOpacity
              onPress={() => setInfoPopupText('')}
              style={styles.cancelButton}>
              <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SelectCategory1Component;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  mapContainer: {
    width: '100%',
    height: height * 0.45,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  otpBox: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 20,
    alignSelf: 'center',
    backgroundColor: '#6538B5',
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
  },
  otpText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
  },
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  loadingText: {fontSize: 18, fontWeight: 'bold', color: '#6A5AE0'},
  selectionContainer: {flex: 2, backgroundColor: '#FFFFFF', padding: 20},
  vehicleScroll: {marginBottom: 20},
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  paymentContainer: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignContent: 'center',
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  paymentText: {
    fontSize: 16,
    color: '#3F35CE',
    marginLeft: 8,
    alignSelf: 'center',
  },
  selectButton: {
    backgroundColor: '#3F35CE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    height: 48,
    width: 118,
    marginLeft: 'auto',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  alarmButton: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    backgroundColor: '#FF3A33',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#F2F1FF',
    borderRadius: 16,
    width: '85%',
    padding: 30,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    color: '#3E35CE',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 30,
  },
  cancelButton: {
    backgroundColor: '#3E35CE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
