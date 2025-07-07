import {
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Animated,
  Image,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';

import PrincipalLoginComponent from '../../components/layouts/PrincipalLoginComponent';
import {useEffect, useRef} from 'react';
// import {getUserCurrentLocation1} from '../components/MapViewComponent';
const {width, height} = Dimensions.get('window');

const PrincipalLogin = ({navigation}) => {
  const fadeIn = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <Animated.View
      style={{
        opacity: fadeIn,
        position: 'stretch',
      }}>
      <SafeAreaView>
        <ImageBackground
          source={require('../../assets/images/principal_login.png')}
          style={{height: '100%', width: '100%'}}
          resizeMode="stretch">
          <Image
            source={require('../../assets/images/logo.png')}
            style={{
              alignSelf: 'center',
              top: height / 4 - 75,
              left: width / 4 - 180,
            }}
          />
          <Image
            source={require('../../assets/images/bird_trip_white.png')}
            style={{
              alignSelf: 'center',
              top: height / 4 - 125,
              left: width / 4 - 50,
            }}
          />

          <PrincipalLoginComponent navigator={navigation} />
        </ImageBackground>
      </SafeAreaView>
    </Animated.View>
  );
};

export default PrincipalLogin;
