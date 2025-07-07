import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CarCard = ({data, selected, onPress, onInfoPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, selected && styles.selectedCard]}>
        <FontAwesome5
          name="info-circle"
          size={16}
          color="#5A41F3"
          style={styles.infoIcon}
          onPress={() => onInfoPress?.(data.carinfo)}
        />

        <View style={styles.topRightContainer}>
          <Text style={styles.carName}>{data.carName || 'Car'}</Text>
          <View style={styles.passengerInfo}>
            <Image
              style={styles.personIcon}
              source={require('../../assets/images/personimage.png')}
            />
            <Text style={styles.passengerCount}>
              {data.passengerCount ?? '-'}
            </Text>
          </View>
        </View>

        <Image source={data.image} style={styles.carImage} />

        <View style={styles.bottomContainer}>
          {!!data.economyText && (
            <View style={styles.economyTag}>
              <Text style={styles.economyText}>{data.economyText}</Text>
            </View>
          )}
          <Text style={styles.price}>{data.price || '$--'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#F6F6F8',
    borderRadius: 12,
    padding: 12,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    height: 150,
    borderColor: '#5A41F3',
    width: '100%',
    position: 'relative',
  },
  selectedCard: {
    borderWidth: 3,
    borderColor: '#3F35CE',
  },
  infoIcon: {
    position: 'absolute',
    top: 8,
    left: 8,
    padding: 4,
  },
  topRightContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  carName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F35CE',
  },
  passengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  personIcon: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
  },
  passengerCount: {
    fontSize: 14,
    marginLeft: 4,
    color: '#5A41F3',
  },
  carImage: {
    width: 112,
    height: 73,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    alignItems: 'flex-end',
  },
  economyTag: {
    backgroundColor: '#3F35CE',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  economyText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3F35CE',
    marginTop: 4,
  },
});

export default CarCard;
