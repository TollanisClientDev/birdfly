import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const DriverCodeComponent = ({navigator}) => {
  const [referralCode, setReferralCode] = useState('');

  const horizontalPadding = width * 0.05;
  const buttonWidth = width * 0.9;
  const inputWidth = width * 0.9;
  const topSpacing = height * 0.25;
  const imageSize = width * 0.15;

  const handleSubmit = () => {
    if (referralCode.length > 5) {
      navigator.navigate('TurnOnLocation');
    } else {
      Alert.alert('Please Enter Referral Code!');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContainer,
          {paddingHorizontal: horizontalPadding},
        ]}
        keyboardShouldPersistTaps="handled">
        <TouchableOpacity
          style={[
            styles.skipButton,
            {top: height * 0.04, right: horizontalPadding},
          ]}
          onPress={() => navigator.navigate('TurnOnLocation')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        <Text style={[styles.title, {marginTop: topSpacing}]}>
          Do you have a Referral Code?
        </Text>

        <Text style={styles.description}>
          Put below the reference code that was provided to you by a driver or
          user of the platform.
        </Text>

        <TextInput
          style={[styles.input, {width: inputWidth}]}
          placeholder="Place the code here"
          placeholderTextColor="#6538B5"
          value={referralCode}
          onChangeText={setReferralCode}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity
          style={styles.qrButton}
          onPress={() => Alert.alert('Open QR Scanner')}>
          <Image
            source={require('../../assets/images/dummy_barcode.png')}
            style={{width: imageSize, height: imageSize, resizeMode: 'contain'}}
          />
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={[
          styles.submitButton,
          {width: buttonWidth, marginBottom: height * 0.05},
        ]}
        onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  skipButton: {
    position: 'absolute',
    paddingVertical: 6,
    paddingHorizontal: 20,
    backgroundColor: '#ECECEC',
    borderRadius: 20,
    zIndex: 1,
  },
  skipText: {
    color: '#4F46E5',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4F46E5',
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginVertical: 15,
  },
  input: {
    padding: 15,
    borderRadius: 10,
    borderColor: '#3F35CE',
    borderWidth: 1.5,
    backgroundColor: '#F3F3F3',
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },
  qrButton: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DriverCodeComponent;
