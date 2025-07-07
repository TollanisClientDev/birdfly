import React, {useEffect, useRef} from 'react';
import {View, Image, Animated, StyleSheet} from 'react-native';

const ZoomAnimationScreen = ({navigation}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current; // For zoom-in
  const translateXAnim = useRef(new Animated.Value(0)).current; // For moving left
  const fadeAnim = useRef(new Animated.Value(0)).current; // For fade-in

  useEffect(() => {
    // Zoom-in and move left animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 2, // Zoom effect
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(translateXAnim, {
        toValue: -40, // Move to left
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Fade-in effect for second image
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        // Navigate to the next screen after animation
        setTimeout(() => {
          navigation.replace('PrincipalLogin'); // Change 'NextScreen' to your target screen
        }, 1000);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* First Image */}
      <Animated.Image
        source={require('../../assets/images/logo.png')} // Replace with your image
        style={[
          styles.image,
          {
            transform: [{scale: scaleAnim}, {translateX: translateXAnim}],
          },
        ]}
      />
      {/* Second Image */}
      <Animated.Image
        source={require('../../assets/images/bird_trip_white.png')} // Replace with your image
        style={[styles.imageText, {opacity: fadeAnim}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3F35CE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 25,
    height: 25,
    position: 'absolute',
  },
  imageText: {
    width: 150,
    height: 40,
    marginLeft: 60,
    position: 'absolute',
  },
});

export default ZoomAnimationScreen;
