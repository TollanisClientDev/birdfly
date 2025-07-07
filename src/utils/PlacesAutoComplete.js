import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {GOOGLE_MAPS_APIKEY} from '../utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDistance} from '../components/layouts/MapViewComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const PlacesAutocomplete = ({
  placeholder,
  onSelect,
  showCurrentLocationIcon = true,
}) => {
  const [query, setQuery] = useState(placeholder.includes('Source') ? '' : '');
  const [results, setResults] = useState([]);
  const [isPickup, setIsPickup] = useState(false);

  useEffect(() => {
    setIsPickup(placeholder.includes('Source'));

    if (query.includes('Current')) {
      AsyncStorage.getItem('pickup').then(async location => {
        if (location) {
          onSelect({
            description: location.description,
            latitude: location.latitude,
            longitude: location.longitude,
          });
        }
      });
    }
  }, [placeholder]);

  const fetchPlaces = async text => {
    setQuery(text);
    if (text.length < 3) {
      setResults([]);
      return;
    }

    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${GOOGLE_MAPS_APIKEY}&language=en`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      if (json.predictions) {
        setResults(json.predictions);
      }
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const fetchPlaceDetails = async (placeId, description) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_MAPS_APIKEY}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      if (json.result && json.result.geometry) {
        const {lat, lng} = json.result.geometry.location;
        onSelect({description, latitude: lat, longitude: lng});
        const locationData = {description, latitude: lat, longitude: lng};
        if (isPickup) {
          await AsyncStorage.setItem('pickup', JSON.stringify(locationData));
          console.log('Saved Pickup:', locationData);
        } else {
          await AsyncStorage.setItem('drop', JSON.stringify(locationData));
          console.log('Saved Drop:', locationData);
        }
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={query}
          onChangeText={fetchPlaces}
        />
        <TouchableOpacity onPress={() => setQuery('')}>
          {/* <Image
            source={require('../assets/images/currentlocation.png')}
            style={[
              styles.icon,
              !showCurrentLocationIcon && {opacity: 0}, // make transparent when false
            ]}
          /> */}
          <MaterialIcons
            name="clear"
            size={20}
            color="#6538B5"
            style={styles.clearIcon}
          />
        </TouchableOpacity>
      </View>

      {results.length > 0 && (
        <FlatList
          data={results}
          keyExtractor={item => item.place_id}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.resultItem}
              onPress={() => {
                setQuery(item.description);
                setResults([]);
                fetchPlaceDetails(item.place_id, item.description);
              }}>
              <Text style={styles.resultText}>{item.description}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default PlacesAutocomplete;

const styles = StyleSheet.create({
  container: {width: '100%'},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  input: {
    flex: 1,
    fontSize: 12,
  },
  icon: {
    marginLeft: 5,
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  resultText: {
    fontSize: 14,
  },
});
