import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PlacesAutocomplete from '../utils/PlacesAutoComplete';

const recentTrips = [
  {
    id: '1',
    title: '5998-5982 W 6th St',
    distance: '5.5km | Los Angeles, CA 90036',
  },
  {
    id: '2',
    title: 'Koreatown Plaza',
    distance: '10km | 928 S Western Ave, Los Angeles, CA 90006',
  },
];

const MapScreen = ({navigation}) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={30} color="#3F35C3" />
          </TouchableOpacity>

          <Text style={styles.title}>Choose Location</Text>

          {/* Source Input */}
          <View style={styles.inputContainer}>
            <View style={styles.iconWrapper}>
              <View style={styles.dot} />
            </View>
            <PlacesAutocomplete
              placeholder="Enter Source"
              onSelect={setPickup}
            />
            <TouchableOpacity>
              <Icon name="crosshairs-gps" size={24} color="#3F35C3" />
            </TouchableOpacity>
          </View>

          {/* Destination Input */}
          <View style={styles.inputContainer}>
            <View style={styles.iconWrapper}>
              <Icon name="map-marker" size={20} color="#3F35C3" />
            </View>
            <PlacesAutocomplete
              placeholder="Enter Destination"
              onSelect={setDropoff}
            />
          </View>

          {/* Recent Trips */}
          <Text style={styles.recentTripsTitle}>Recent Trips</Text>
          <FlatList
            data={recentTrips}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.tripItem}
                onPress={() => setPickup(item.title)}>
                <Icon
                  name="history"
                  size={24}
                  color="#3F35C3"
                  style={styles.historyIcon}
                />
                <View>
                  <Text style={styles.tripTitle}>{item.title}</Text>
                  <Text style={styles.tripSubtitle}>{item.distance}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  scrollContainer: {flexGrow: 1, paddingBottom: 20},
  container: {flex: 1, backgroundColor: '#fff', padding: 20, borderRadius: 20},
  backButton: {position: 'absolute', left: 10, top: 10, zIndex: 10},
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F35C3',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 20,
    marginBottom: 15,
    elevation: 2,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  dot: {width: 10, height: 10, borderRadius: 5, backgroundColor: '#6A5ACD'},
  recentTripsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#3F35C3',
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    backgroundColor: 'white',
    elevation: 2,
    justifyContent: 'center',
  },
  historyIcon: {marginRight: 10},
  tripTitle: {fontSize: 14, fontWeight: 'bold'},
  tripSubtitle: {fontSize: 12, color: '#7D7D7D'},
});
