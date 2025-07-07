import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Dimensions,
  Alert,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GOOGLE_MAPS_APIKEY} from '../../utils/Constants';

const {height} = Dimensions.get('window');

const getDistance = async (origin, destination) => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin.latitude},${origin.longitude}&destinations=${destination.latitude},${destination.longitude}&key=${GOOGLE_MAPS_APIKEY}`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    const element = json.rows[0]?.elements[0];

    if (element?.status === 'OK') {
      const {distance, duration} = element;
      return {distance: distance.text, duration: duration.text};
    } else {
      console.error('Distance API error:', json);
      return null;
    }
  } catch (error) {
    console.error('Error fetching distance:', error);
    return null;
  }
};

const MapViewComponent = ({pickUpCoordinate, dropOffCoordinate}) => {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [pickUp, setPickup] = useState(null);
  const [dropOff, setDropOff] = useState(null);
  const [manualMarker, setManualMarker] = useState(null);

  useEffect(() => {
    if (pickUpCoordinate) {
      setPickup({
        latitude: pickUpCoordinate.latitude,
        longitude: pickUpCoordinate.longitude,
      });
    }
    if (dropOffCoordinate) {
      setDropOff({
        latitude: dropOffCoordinate.latitude,
        longitude: dropOffCoordinate.longitude,
      });
    }
  }, [pickUpCoordinate, dropOffCoordinate]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            Alert.alert(
              'Permission Denied',
              'Location permission is required to use this feature.',
            );
          }
        } catch (err) {
          console.warn('Permission error:', err);
        }
      } else {
        getCurrentLocation();
      }
    };
    requestLocationPermission();
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        const current = {latitude, longitude};
        setLocation(current);

        await AsyncStorage.setItem(
          'pickup',
          JSON.stringify({description: '', latitude, longitude}),
        );
      },
      error => console.log('Error getting location:', error),
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    if (pickUp && dropOff && mapRef.current) {
      setTimeout(() => {
        mapRef.current.fitToCoordinates([pickUp, dropOff], {
          edgePadding: {top: 100, right: 50, bottom: 100, left: 50},
          animated: true,
        });
      }, 2000);
    }
  }, [pickUp, dropOff]);

  const handleMapPress = event => {
    setManualMarker(event.nativeEvent.coordinate);
  };

  const renderMarkers = () => (
    <>
      {pickUp && <Marker coordinate={pickUp} title="Pickup" pinColor="green" />}
      {dropOff && (
        <Marker coordinate={dropOff} title="Drop-off" pinColor="red" />
      )}
      {manualMarker && (
        <Marker
          coordinate={manualMarker}
          title="Manual Marker"
          pinColor="blue"
        />
      )}
    </>
  );

  const renderDirections = () =>
    pickUp &&
    dropOff && (
      <MapViewDirections
        origin={pickUp}
        destination={dropOff}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={4}
        strokeColor="blue"
      />
    );

  return (
    <View style={styles.mapContainer}>
      {(pickUp && dropOff) || location ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={
            pickUp || location
              ? {
                  latitude: (pickUp || location).latitude,
                  longitude: (pickUp || location).longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }
              : undefined
          }
          onPress={handleMapPress}
          showsUserLocation>
          {renderMarkers()}
          {renderDirections()}
        </MapView>
      ) : (
        <Text style={styles.loadingText}>Loading map...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    width: '100%',
    height: height * 0.42,
  },
  map: {
    flex: 1,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export {MapViewComponent, getDistance};
