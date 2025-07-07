import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import CarCard from './CarCardComponent';
import InsideCarComponent from './InsideCarComponent';

const DriveToSpecificCustomerComponent = ({navigation, selectedCar}) => {
  const [driverView, setDriverView] = useState(false);

  const ChangeView = () => {
    if (!selectedCar) {
      console.log('No car card selected yet');
      return;
    }
    setDriverView(true);
  };

  if (driverView) {
    return <InsideCarComponent navigation={navigation} />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.statusText}>
          You've selected a trip with Steven
        </Text>

        <View style={styles.driverContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DriverProfile', {
                navigation,
                isDriver: true,
              })
            }>
            <Image
              source={require('../../assets/images/DriverImage.png')}
              style={styles.driverImage}
            />
          </TouchableOpacity>

          <View style={styles.driverDetails}>
            <View style={styles.ratingContainer}>
              <FontAwesome5 name="star" size={10} color="#FFBC2A" solid />
              <Text style={styles.ratingText}> 4.8</Text>
            </View>
            <Text style={styles.driverName}>Steven Smith</Text>
            <View style={styles.plateContainer}>
              <Text style={styles.plateText}>3A LA 5914</Text>
            </View>
          </View>
        </View>

        {selectedCar && (
          <View style={{width: '100%'}}>
            <CarCard data={selectedCar} selected={true} onPress={() => {}} />
          </View>
        )}
      </ScrollView>

      <View style={styles.paymentContainer}>
        <View style={styles.paymentRow}>
          <TouchableOpacity
            style={styles.paymentInfo}
            onPress={() =>
              navigation.navigate('AddWalletDetails', {isFromDashboard: false})
            }>
            <MaterialIcons name="credit-card" size={30} color="#EEEEEE" />
            <Text style={styles.paymentText}>2128</Text>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color="#EEEEEE"
              style={{alignSelf: 'center'}}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.selectButton} onPress={ChangeView}>
            <Text style={styles.selectButtonText}>Select</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  statusText: {
    fontSize: 16,
    color: '#2D2D2D',
    marginBottom: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  driverImage: {
    width: 108,
    height: 48,
    borderRadius: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  driverDetails: {
    alignItems: 'flex-start',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  ratingText: {
    fontSize: 12,
    color: '#333',
  },
  driverName: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  plateContainer: {
    backgroundColor: '#D3E3FC',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  plateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3A50B4',
  },
  paymentContainer: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
    justifyContent: 'center',
  },
  selectButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DriveToSpecificCustomerComponent;
