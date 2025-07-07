import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {BackButtonCircle} from './BackButtonComponent';
import EndOfTheTripComponent from './EndOfTheTripComponent';

const InsideCarComponent = ({navigation}) => {
  const [endTripView, setendTripView] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setendTripView(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: false,
    }).start();
  }, []);

  const cancelRide = () => {
    setCancelReasons(true);
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const birdPosition = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {!endTripView ? (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            {/* Animated Progress Bar with Bird */}
            {/* Progress Bar Container */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <Animated.View
                  style={[styles.progressFill, {width: progressWidth}]}
                />
              </View>
              <Animated.View style={[styles.birdIcon, {left: birdPosition}]}>
                <Image
                  source={require('../../assets/images/bluebird.png')}
                  style={{width: 20, height: 20, resizeMode: 'contain'}}
                />
              </Animated.View>
            </View>
            <View style={styles.row}>
              <Text style={styles.etaText}>
                Estimated time {'\n'} of arrival:
              </Text>
              <View style={styles.timeContainer}>
                <View style={styles.timeBox}>
                  <Text style={styles.timeText}>20</Text>
                </View>
                <Text style={styles.colon}>:</Text>
                <View style={styles.timeBox}>
                  <Text style={styles.timeText}>32</Text>
                </View>
              </View>
            </View>

            {/* Driver Info */}
            <View style={styles.driverRow}>
              <Image
                source={require('../../assets/images/DriverImage.png')}
                style={styles.driverImage}
              />
              <View style={styles.driverInfo}>
                <View style={styles.ratingContainer}>
                  <FontAwesome5 name="star" size={10} color="#FFBC2A" solid />
                  <Text style={styles.ratingText}> 4.8</Text>
                </View>
                <Text style={styles.driverName}>Steven Smith</Text>
                <Text style={styles.carName}>Toyota Corolla - Blue</Text>
                <View style={styles.ratingRow}></View>
              </View>
            </View>

            <View style={styles.plateContainerCentered}>
              <Text style={styles.plateText}>3A LA 5914</Text>
            </View>

            {/* Address Section */}
            <View style={styles.addressRow}>
              <Image
                source={require('../../assets/images/logo.png')}
                style={styles.locationIcon}
              />
              <Text style={styles.addressText}>633 W 5th St</Text>
              <TouchableOpacity>
                <Text style={styles.changeText}>Change or Add</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addressRow}>
              <FontAwesome5 name="star" size={10} style={styles.locationIcon} />
              <Text style={styles.addressText}>Is your trip going well ?</Text>
              <TouchableOpacity>
                <Text style={styles.changeText}>Rate Your Trip</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Promotions */}
          <View style={styles.promoContainer}>
            <TouchableOpacity style={styles.fullWidthPromo}>
              <Image
                source={require('../../assets/images/home_image_one.png')}
                style={styles.fullWidthImage}
              />
            </TouchableOpacity>
            <View style={styles.rowPromo}>
              <TouchableOpacity style={styles.promoCard}>
                <Image
                  source={require('../../assets/images/home_image_two.png')}
                  style={styles.promoImage}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.promoCard}>
                <Image
                  source={require('../../assets/images/home_image_three.png')}
                  style={styles.promoImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <EndOfTheTripComponent navigation={navigation} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // your existing styles here (unchanged)
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  box: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    width: '106%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etaText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  timeBox: {
    width: 41,
    height: 41,
    backgroundColor: '#3F35CE',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    gap: 15,
  },
  driverImage: {
    width: 108,
    height: 48,
    borderRadius: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  driverInfo: {
    alignItems: 'left',
  },
  driverName: {
    fontSize: 16,
    textAlign: 'left', // Align text to the left
  },
  carName: {
    fontSize: 12,
    color: '#858585',
    textAlign: 'left', // Align text to the left
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    justifyContent: 'center',
  },
  plateContainer: {
    backgroundColor: '#D3E1FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'center',
  },
  plateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3F35CE',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  locationIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    alignSelf: 'center',
    paddingVertical: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  changeText: {
    fontSize: 14,
    color: '#006AFF',
    fontWeight: 'bold',
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#000',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 8,
  },
  rateText: {
    fontSize: 16,
    color: '#fff',
  },
  rateLink: {
    fontSize: 16,
    color: '#5636D3',
    fontWeight: 'bold',
  },
  promoContainer: {
    marginTop: 10,
  },
  promoCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  promoImage: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 12,
  },
  promoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1,
    justifyContent: 'center',
  },
  ratingText: {
    fontSize: 9,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 4,
    width: 50,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#D3D3D3',
  },
  plateContainerCentered: {
    backgroundColor: '#B7D9EC',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10,
  },
  fullWidthPromo: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fullWidthImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  rowPromo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promoCard: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  promoImage: {
    width: '100%',
    height: 156,
    resizeMode: 'cover',
  },
  progressContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'flex-start',
    paddingVertical: 10,
    marginBottom: 30,
    overflow: 'visible', // allow bird icon to render outside
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#D3D3D3',
    borderRadius: 4,
    overflow: 'hidden',
    zIndex: 1, // ensure progress bar is below bird
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    backgroundColor: '#C085FF',
  },
  birdIcon: {
    position: 'absolute',
    zIndex: 2, // bring bird above bar
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
});

export default InsideCarComponent;
