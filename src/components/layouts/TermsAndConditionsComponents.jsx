import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const TermsAndConditionsComponent = ({
  navigator,
  showBottomButtons = true,
  checkboxText = 'I accept the terms',
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxToggle = () => setIsChecked(!isChecked);

  const reservedBottomHeight = showBottomButtons ? 10 : 110;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>

      <View style={{flex: 1}}>
        <View style={{flex: 1, marginBottom: reservedBottomHeight}}>
          <View style={styles.termsContainer}>
            <ScrollView showsVerticalScrollIndicator={true}>
              <Text style={styles.heading}>Bird Trip Terms and Conditions</Text>
              <Text style={styles.paragraph}>
                Welcome to Bird Trip! By accessing or using the Bird Trip
                application ("the App"), you agree to comply with and be bound
                by these Terms and Conditions ("Terms"). Please read them
                carefully before using the App. If you do not agree to these
                Terms, do not use the App.
              </Text>
              <Text style={styles.paragraph}>
                1. Introduction: Bird Trip is a platform that connects users
                ("Riders") seeking transportation services with independent
                third-party providers ("Drivers"). Bird Trip itself does not
                provide transportation services.
              </Text>
              <Text style={styles.paragraph}>
                2. User Eligibility: To use Bird Trip, you must:
              </Text>
              <Text style={styles.bullet}>- Be at least 18 years old.</Text>
              <Text style={styles.bullet}>
                - Provide accurate and complete information during the
                registration process.
              </Text>
            </ScrollView>
          </View>
        </View>

        {showBottomButtons && (
          <>
            <View style={styles.checkboxContainer}>
              <BouncyCheckbox
                size={15}
                textComponent={
                  <Text style={styles.checkboxText}>{checkboxText}</Text>
                }
                innerIconStyle={{borderWidth: 2, borderRadius: 2}}
                fillColor="#B7D9EC"
                iconStyle={{borderColor: 'red', borderRadius: 2}}
                onPress={handleCheckboxToggle}
                isChecked={isChecked}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: isChecked ? '#6538B5' : '#9B96E0',
                },
              ]}
              onPress={() => {
                if (!isChecked) {
                  Alert.alert('Please accept the terms to continue.');
                  return;
                }
                navigator.navigate('Home');
              }}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3F35CE',
    textAlign: 'center',
    marginBottom: 20,
  },
  termsContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
    lineHeight: 20,
  },
  bullet: {
    fontSize: 14,
    color: '#555',
    marginLeft: 20,
    marginBottom: 10,
  },
  checkboxContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  checkboxText: {
    fontSize: 14,
    padding: 5,
    color: '#3F35CE',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TermsAndConditionsComponent;
