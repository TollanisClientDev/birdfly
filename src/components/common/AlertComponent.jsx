// AlertScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from './BackButtonComponent';
import BackButtonWithHeader from './BackButtonWithHeader';

const {width} = Dimensions.get('window');

const AlertComponent = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <BackButtonWithHeader
        Heading="Alert"
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.alertTextContainer}>
        <Text style={styles.needHelpText}>Need help?</Text>
        <Text style={styles.clickBelowText}>Just click the button below</Text>
      </View>
      {/* Red Alert Button */}
      <TouchableOpacity style={styles.alertButton}>
        <Image
          source={require('../../assets/images/alerticon.png')}
          style={styles.alertIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>

      {/* Two Half‑Width Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.optionButton}>
          <View style={styles.iconWrapper}>
            <Icon name="call" size={24} color="#fff" />
          </View>
          <Text style={styles.optionText}>Emergency Contact</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionButton}>
          <View style={styles.iconWrapper}>
            <Icon name="location-sharp" size={24} color="#fff" />
          </View>
          <Text style={styles.optionText}>Share Location</Text>
        </TouchableOpacity>
      </View>

      {/* Record Audio — Full Width */}
      <TouchableOpacity style={styles.fullWidthButton}>
        <View style={styles.fullButtonContent}>
          <View style={styles.iconWrapper}>
            <Icon name="mic" size={24} color="#fff" />
          </View>
          <Text style={[styles.optionText, {marginLeft: 10}]}>
            Record Audio
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AlertComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F4FA',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  alertLabel: {
    color: '#6538B5',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    color: '#222',
  },
  subtitle: {
    color: '#888',
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },

  alertIcon: {
    width: 208,
    height: 208,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#fff',
    width: '47%',
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
  },
  fullWidthButton: {
    backgroundColor: '#fff',
    width: width * 0.9,
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: 'center',
  },
  fullButtonContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconWrapper: {
    backgroundColor: '#6538B5',
    padding: 10,
    borderRadius: 25,
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#222',
    textAlign: 'center',
    fontWeight: '500',
  },
  alertTextContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  needHelpText: {
    fontSize: 30,
    color: '#2D2D2D',
    fontWeight: '600',
  },
  clickBelowText: {
    fontSize: 16,
    color: '#999999',
    fontWeight: '400',
    marginTop: 4,
  },
});
