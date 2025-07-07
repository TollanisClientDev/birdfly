import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChatCard = ({user, onDelete}) => {
  const handleCall = async () => {
    if (user?.phone) {
      try {
        await Linking.openURL(`tel:${user.phone}`);
      } catch (err) {
        console.warn('Failed to make a call:', err);
      }
    } else {
      Alert.alert('Phone number not available');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Driver',
      `Are you sure you want to remove ${user?.name} from your favourite drivers?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const existingFavorites =
                await AsyncStorage.getItem('favoriteDrivers');
              const favoriteDrivers = existingFavorites
                ? JSON.parse(existingFavorites)
                : [];
              const updatedDrivers = favoriteDrivers.filter(
                name => name !== user?.name,
              );
              await AsyncStorage.setItem(
                'favoriteDrivers',
                JSON.stringify(updatedDrivers),
              );
              if (onDelete) onDelete(user?.name);
            } catch (error) {
              console.error('Error deleting driver:', error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.statusDot,
          {backgroundColor: user?.isActive ? '#00C400' : '#FF4747'},
        ]}
      />
      <View style={styles.topRow}>
        <Image
          source={user?.image || require('../../assets/images/bruno_image.png')}
          style={styles.avatar}
        />
        <View style={styles.textColumn}>
          <Text style={styles.name}>{user?.name || 'Unknown'}</Text>
          <Text style={styles.message}>Thank you for traveling again!</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.messageBtn} onPress={handleCall}>
          <Text style={styles.messageText}>Call the Driver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.callBtn} onPress={handleDelete}>
          <FontAwesome name="trash" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AVATAR_SIZE = 55;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F1FF',
    borderRadius: 12,
    padding: 30,
    marginHorizontal: 16,
    marginTop: 16,
    position: 'relative',
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textColumn: {
    marginLeft: 12,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F35CE',
  },
  message: {
    color: '#6538B5',
    fontSize: 14,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  messageBtn: {
    flex: 1,
    backgroundColor: '#3F35CE',
    borderColor: '#756CFF',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  callBtn: {
    width: 50,
    backgroundColor: '#3F35CE',
    borderColor: '#756CFF',
    borderWidth: 1,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ChatCard;
