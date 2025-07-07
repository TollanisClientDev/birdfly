import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import PlacesAutocomplete from '../../utils/PlacesAutoComplete';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BackButtonWithHeader from '../common/BackButtonWithHeader';

const ChooseLocationComponent = ({navigator, isDirect}) => {
  const [pickup, setPickup] = useState('');
  const [stops, setStops] = useState([
    {id: Date.now().toString(), description: '', distance: ''},
  ]);
  const [recentTrips, setRecentTrips] = useState([]);

  useEffect(() => {
    const loadRecentTrips = async () => {
      try {
        const location = await AsyncStorage.getItem('drop');
        if (location) {
          const parsed = JSON.parse(location);
          const newTrip = {
            id: Date.now().toString(),
            title: parsed.description,
            distance: `${parsed.distance} | ${parsed.description}`,
          };
          const updated = [newTrip, ...recentTrips].slice(0, 10);
          setRecentTrips(updated);
          await AsyncStorage.setItem('recentTrips', JSON.stringify(updated));
        }
      } catch (err) {
        console.error('Error loading recent trips:', err);
      }
    };
    loadRecentTrips();
  }, []);

  const handleStopSelect = (index, place) => {
    setStops(prevStops => {
      const newStops = [...prevStops];
      const desc = place.description || '';
      const dist = place.distance != null ? place.distance : '';
      newStops[index] = {
        id: newStops[index].id,
        description: desc,
        distance: dist ? `${dist} | ${desc}` : '',
      };
      return newStops;
    });
  };

  const handleAddStop = () => {
    setStops(prevStops => [
      ...prevStops,
      {
        id: Date.now().toString() + Math.random().toString().slice(2),
        description: '',
        distance: '',
      },
    ]);
  };

  const handleRemoveStop = id => {
    setStops(prevStops => {
      const filtered = prevStops.filter(s => s.id !== id);
      return filtered.length === 0
        ? [{id: Date.now().toString(), description: '', distance: ''}]
        : filtered;
    });
  };

  const handleConfirm = () => {
    const validStops = stops.filter(s => s.description.trim().length > 0);
    const pickupText =
      typeof pickup === 'string' ? pickup : pickup?.description || '';

    if (!pickupText || validStops.length === 0) {
      Alert.alert(
        'Error',
        'Please enter both source and at least one destination.',
      );
      return;
    }

    navigator.navigate('SelectCategory1', {
      pickup: pickupText,
      stops: validStops,
      isDirect,
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={{marginBottom: 30}}>
        <BackButtonWithHeader
          Heading="Choose Location"
          onBackPress={() => navigator.goBack()}
        />
      </View>

      <FlatList
        data={recentTrips}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponentStyle={styles.listHeader}
        ListHeaderComponent={
          <>
            <View style={styles.inputWrapper}>
              <View style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/images/pickupspot.png')}
                  style={styles.dot}
                />
              </View>
              <View style={styles.autoCompleteWrapper}>
                <PlacesAutocomplete
                  placeholder="Choose Pick-up spot"
                  value={pickup}
                  onSelect={setPickup}
                />
              </View>
            </View>

            <View style={styles.uploadedImageWrapper}>
              <Image
                source={require('../../assets/images/dottedline.png')}
                style={styles.uploadedImage}
              />
            </View>

            {stops.map((stop, index) => {
              const z = Math.max(1, 10 - index);
              return (
                <View
                  key={stop.id}
                  style={[
                    styles.inputWrapper,
                    {zIndex: z, elevation: z},
                    index > 0 && styles.second,
                  ]}>
                  <View style={styles.iconWrapper}>
                    <Image
                      source={require('../../assets/images/dropspot.png')}
                      style={styles.dot}
                    />
                  </View>
                  <View style={styles.autoCompleteWrapper}>
                    <View style={styles.inputRow}>
                      <PlacesAutocomplete
                        placeholder={
                          index === 0 ? 'Where to?' : `Stop ${index + 1}`
                        }
                        value={stop.description}
                        onSelect={place => handleStopSelect(index, place)}
                        showCurrentLocationIcon={false}
                      />
                      <TouchableOpacity
                        onPress={
                          index === 0
                            ? handleAddStop
                            : () => handleRemoveStop(stop.id)
                        }
                        style={styles.inlineButton}>
                        <MaterialIcons
                          name={index === 0 ? 'add-circle-outline' : 'close'}
                          size={20}
                          color="#302A95"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}

            <Text style={styles.recentTripsTitle}>Recent trips</Text>
          </>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.tripItem}
            onPress={() =>
              handleStopSelect(0, {
                description: item.title,
                distance: item.distance.split(' | ')[0],
              })
            }>
            <MaterialIcons
              name="history"
              size={25}
              color="#302A95"
              style={styles.historyIcon}
            />
            <View>
              <Text style={styles.tripTitle}>{item.title}</Text>
              <Text style={styles.tripSubtitle}>{item.distance}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChooseLocationComponent;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  listHeader: {zIndex: 10, elevation: 10},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 5,
    zIndex: 3,
    elevation: 3,
  },
  second: {
    zIndex: 2,
    elevation: 2,
  },
  iconWrapper: {
    marginRight: 10,
    width: 28,
    alignItems: 'center',
  },
  dot: {width: 28, height: 28, resizeMode: 'contain'},
  autoCompleteWrapper: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    zIndex: 999,
  },
  uploadedImageWrapper: {
    marginLeft: 11,
    marginBottom: 5,
  },
  uploadedImage: {width: 46, height: 20, resizeMode: 'contain'},
  recentTripsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#302A95',
    marginTop: 50,
    marginLeft: 45,
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: -5,
    marginVertical: 5,
    borderRadius: 10,
    padding: 5,
  },
  historyIcon: {
    marginRight: 10,
    backgroundColor: '#B7D9EC',
    borderRadius: 30,
    padding: 5,
  },
  tripTitle: {color: '#302A95', fontSize: 12, fontWeight: 'bold'},
  tripSubtitle: {fontSize: 10, color: '#7D7D7D'},
  footer: {padding: 20},
  confirmButton: {
    backgroundColor: '#3F35CE',
    borderRadius: 6,
    paddingVertical: 15,
    alignItems: 'center',
  },
  confirmText: {color: '#fff', fontSize: 16, fontWeight: '600'},
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inlineButton: {
    paddingLeft: 12,
  },
});
