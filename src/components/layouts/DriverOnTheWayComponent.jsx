import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import CancelReasonComponent from './CancelReasonsComponent';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import InsideCarComponent from './InsideCarComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

const DriverOnTheWayComponent = ({navigation}) => {
  const [cancelReasons, setCancelReasons] = useState(false);
  const [insideCar, setInsideCar] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => setInsideCar(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 10000,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, []);

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const birdPosition = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  if (cancelReasons) return <CancelReasonComponent navigation={navigation} />;
  if (insideCar) return <InsideCarComponent navigation={navigation} />;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Progress Bar with Bird */}
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

        {/* Driver Status */}
        <Text style={styles.statusText}>Steven is on the way!</Text>

        {/* Arrival Time Badge */}
        <View style={styles.timeBadge}>
          <Text style={styles.timeText}>5</Text>
          <Text style={styles.timeSubText}>min</Text>
        </View>

        {/* Driver Details */}
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
            <Text style={styles.carName}>Toyota Corolla - Blue</Text>
            <View style={styles.plateContainer}>
              <Text style={styles.plateText}>3A LA 5914</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setCancelReasons(true)}
          accessibilityLabel="Cancel ride">
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.chatButton}
          accessibilityLabel="Open chat with driver">
          <Ionicons name="chatbox-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DriverOnTheWayComponent;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 344,
    elevation: 4,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  progressContainer: {
    width: '100%',
    position: 'relative',
    alignItems: 'flex-start',
    paddingVertical: 10,
    marginBottom: 80,
    overflow: 'visible',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#D3D3D3',
    borderRadius: 4,
    overflow: 'hidden',
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
    zIndex: 2,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'flex-start',
    marginVertical: 10,
  },
  timeBadge: {
    backgroundColor: '#5A41F3',
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 19,
    position: 'absolute',
    top: 40,
    right: 20,
  },
  timeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center',
  },
  timeSubText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
  carName: {
    fontSize: 12,
    color: '#858585',
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
  buttonsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#3E35CE',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  chatButton: {
    backgroundColor: '#5A41F3',
    borderRadius: 30,
    padding: 12,
  },
});
