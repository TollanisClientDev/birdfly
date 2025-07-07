import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default function BirdCoinInfoComponent() {
  return (
    <View>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          To get Bird Coins, you need to obtain a unique code from a driver or
          user.
        </Text>
      </View>

      <View style={styles.questionContainer}>
        <View style={styles.circle}>
          <Text style={styles.questionMark}>?</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  infoBox: {
    backgroundColor: '#B7D9EC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
    width: width - 40,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#3F35CE',
    textAlign: 'center',
  },
  questionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionMark: {
    fontSize: 72,
    color: '#3F35CE',
    fontWeight: 'bold',
  },
});
