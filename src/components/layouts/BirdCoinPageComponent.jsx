import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

const BirdCoinPageComponent = ({navigation}) => {
  const [code] = useState('93XY2');

  const copyToClipboard = () => {
    Clipboard.setString(code);
    Alert.alert('Copied', 'Code copied to clipboard!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Olá, <Text style={styles.username}>Bruno!</Text>
        </Text>
        <TouchableOpacity
          style={styles.codeContainer}
          onPress={copyToClipboard}>
          <Text style={styles.codeText}>{code}</Text>
          <Image
            source={require('../../assets/images/copy_image.png')}
            style={styles.copyIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <View style={styles.balanceRow}>
          <Image
            source={require('../../assets/images/birdcoin.png')}
            style={styles.coinIcon}
          />
          <Text style={styles.balanceText}>126,50</Text>
          <TouchableOpacity>
            <Image
              source={require('../../assets/images/bird_right_arrow.png')}
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BirdCoinMetrics');
        }}>
        <View style={styles.referralCard}>
          <Text style={styles.referralText}>
            <Text style={styles.boldText}>50</Text> people referred
          </Text>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../assets/images/bird_random_one.png')}
              style={styles.avatar}
            />
            <Image
              source={require('../../assets/images/bird_random_two.png')}
              style={styles.avatar}
            />
            <Image
              source={require('../../assets/images/bird_random_three.png')}
              style={styles.avatar}
            />
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Before your trip starts, make sure to select the Bird Coin payment
          method to use your balance.
        </Text>
      </View>

      <Image
        source={require('../../assets/images/BirdInfo.png')}
        style={styles.illustration}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 55,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000',
  },
  username: {
    fontWeight: '700',
    color: '#3F35CE',
  },
  codeContainer: {
    flexDirection: 'row',
    backgroundColor: '#3F35CE',
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  codeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 6,
  },
  copyIcon: {
    width: 16,
    height: 16,
    tintColor: '#fff',
  },
  balanceCard: {
    backgroundColor: '#3F35CE',
    borderRadius: 15,
    padding: 22,
    marginTop: 25,
    alignItems: 'center',
  },
  balanceLabel: {
    color: '#C7C6FB',
    fontSize: 15,
    alignSelf: 'center',
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  balanceText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '700',
    marginLeft: 10,
  },
  coinIcon: {
    width: 40,
    height: 40,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    marginLeft: 5,
  },
  referralCard: {
    backgroundColor: '#F1EFFF',
    borderRadius: 15,
    padding: 16,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  referralText: {
    fontSize: 16,
    color: '#3F35CE',
  },
  boldText: {
    fontWeight: '700',
  },
  avatarContainer: {
    flexDirection: 'row',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: -10,
  },
  infoBox: {
    backgroundColor: '#F1EFFF',
    borderRadius: 15,
    padding: 16,
    marginTop: 25,
  },
  infoText: {
    color: '#3F35CE',
    fontSize: 14.5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  illustration: {
    width: 216,
    height: 155,
    alignSelf: 'center',
    marginTop: 35,
    resizeMode: 'contain',
  },
});

export default BirdCoinPageComponent;
