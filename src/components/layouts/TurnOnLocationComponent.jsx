import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TurnOnLocationComponent = ({navigation}) => {
  const handlePermission = async () => {
    navigation.navigate('TermsAndConditions', {
      showBottomButtons: true,
      checkboxText: 'I accept the Terms',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/location_illustration.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.heading}>Turn on location!</Text>
        <Text style={styles.subText}>
          We need this for better experience on every trip
        </Text>

        <TouchableOpacity style={styles.button} onPress={handlePermission}>
          <Text style={styles.buttonText}>Next</Text>
          <Icon
            name="chevron-forward"
            size={22}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: '100%',
    height: 280,
    marginBottom: 32,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3F35CE',
    textAlign: 'center',
    marginBottom: 12,
  },
  subText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#3F35CE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  icon: {
    marginTop: 1,
  },
});

export default TurnOnLocationComponent;
