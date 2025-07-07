import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {BackButtonCircle} from './BackButtonComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EndOfTheTripComponent = ({navigation}) => {
  const [rating, setRating] = useState(0);

  const handleStarPress = index => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    // TODO: submit rating, comment, and tip
    navigation.navigate('Home');
  };
  const handleHeartPress = async driverName => {
    try {
      // Retrieve the existing list of favorite drivers
      const existingFavorites = await AsyncStorage.getItem('favoriteDrivers');
      const favoriteDrivers = existingFavorites
        ? JSON.parse(existingFavorites)
        : [];

      // Add the new driver to the list if not already present
      if (!favoriteDrivers.includes(driverName)) {
        favoriteDrivers.push(driverName);
        await AsyncStorage.setItem(
          'favoriteDrivers',
          JSON.stringify(favoriteDrivers),
        );
        Alert.alert(
          'Success',
          `${driverName} added to your favourite drivers!`,
        );
      } else {
        Alert.alert(
          'Info',
          `${driverName} is already in your favourite drivers!`,
        );
      }

      console.log('Updated favorite drivers:', favoriteDrivers);
    } catch (error) {
      console.error('Error saving driver:', error);
    }
  };
  return (
    <View style={styles.container}>
      {/* Rating Section */}
      <View style={styles.card}>
        <Text style={styles.thankYou}>
          Thank you for traveling with Bird Trip!
        </Text>

        {/* Driver Info */}
        <View style={styles.driverRow}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}}
            style={styles.profileImage}
          />
          <View style={styles.infoContainer}>
            <View style={styles.ratingRow}>
              <FontAwesome5
                name="star"
                size={16}
                color="#FFBC2A"
                solid
                style={styles.starIcon}
              />
              <Text style={styles.ratingText}>4.8</Text>
            </View>
            <Text style={styles.driverName}>Steven Smith</Text>
            <Text style={styles.carDetails}>Toyota Corolla - Blue</Text>
          </View>
          <TouchableOpacity onPress={() => handleHeartPress('Steven Smith')}>
            <FontAwesome5 name="heart" size={24} color="#FF5757" solid />
          </TouchableOpacity>
        </View>

        {/* Star Rating */}
        <View style={styles.starsRow}>
          {[...Array(5)].map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleStarPress(index)}>
              <FontAwesome5
                name="star"
                size={32}
                color={index < rating ? '#3F35CE' : '#3F35CE'}
                solid={index < rating}
                style={styles.star}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Comment Box */}
        <View style={styles.commentBox}>
          <TextInput
            placeholder="Leave a special comment"
            style={styles.input}
            placeholderTextColor="#888"
          />
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color="#888"
            style={[styles.searchIcon, {transform: [{scaleX: -1}]}]}
          />
        </View>

        {/* Tip Section */}
        <Text style={styles.tipText}>To fly higher, tip Steven!</Text>

        {/* Tip Buttons */}
        <View style={styles.tipRow}>
          {['10%', '15%', '20%'].map((tip, index) => (
            <TouchableOpacity key={index} style={styles.tipButton}>
              <Text style={styles.tipTextButton}>{tip}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EndOfTheTripComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    alignSelf: 'center',
  },
  thankYou: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    width: '100%',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#D3D3D3',
    paddingHorizontal: 4,
    paddingVertical: 2,
    alignSelf: 'flex-start',
  },
  starIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  carDetails: {
    fontSize: 14,
    color: '#888',
  },
  heartIcon: {
    marginLeft: 'auto',
  },
  heartIconContainer: {
    borderWidth: 2, // Add border width
    borderColor: '#3E35CE', // Set border color
    borderRadius: 24, // Make the border circular
    padding: 8, // Add padding to create space around the heart icon
    alignItems: 'center', // Center the heart icon
    justifyContent: 'center', // Center the heart icon
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  star: {
    marginHorizontal: 5,
  },
  commentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginVertical: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  searchIcon: {
    marginLeft: 10,
  },
  tipText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },
  submitButton: {
    backgroundColor: '#6538B5',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    marginVertical: 10,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tipButton: {
    backgroundColor: '#6538B5',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  tipTextButton: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
