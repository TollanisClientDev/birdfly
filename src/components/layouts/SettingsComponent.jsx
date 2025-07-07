import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  Image,
  Platform,
  Dimensions,
  Alert,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import defaultAvatar from '../../assets/images/bruno_image.png';
import BackButtonWithHeader from '../common/BackButtonWithHeader';
import {InputFromUser} from './LoginComponent';

const config = {
  showSurname: true,
  showEmail: true,
  showPassword: true,
  showConfirmPassword: true,
  showMobileNumber: true,
  showEmergencyContacts: true,
  showShareLocation: true,
  showTripPreferences: true,
};

const {width} = Dimensions.get('window');

const allTripPreferences = [
  'Air conditioning on',
  'Open windows',
  'Less music on the trip',
  'I prefer not to  talk',
  'I prefer a quiet trip',
  'I reward good drivers',
];

const SettingsComponent = ({navigation}) => {
  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [contacts, setContacts] = useState(['']);
  const [shareLocation, setShareLocation] = useState(false);
  const [selectedTripPreferences, setSelectedTripPreferences] = useState([]);

  const pickImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.7,
        selectionLimit: 1,
      },
      response => {
        if (response.didCancel) return;
        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Unknown error');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setProfileImage(response.assets[0].uri);
        }
      },
    );
  };

  const addContact = () => {
    if (contacts.length < 3) {
      setContacts([...contacts, '']);
    } else {
      Alert.alert(
        'Limit Reached',
        'You can add up to 3 emergency contacts only.',
      );
    }
  };

  const updateContact = (text, index) => {
    const updated = [...contacts];
    updated[index] = text;
    setContacts(updated);
  };

  const deleteContact = index => {
    const updated = contacts.filter((_, i) => i !== index);
    setContacts(updated);
  };

  const availableTripPreferences = allTripPreferences.filter(
    pref => !selectedTripPreferences.includes(pref),
  );

  const togglePreference = preference => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (selectedTripPreferences.includes(preference)) {
      setSelectedTripPreferences(
        selectedTripPreferences.filter(p => p !== preference),
      );
    } else if (selectedTripPreferences.length < 3) {
      setSelectedTripPreferences([...selectedTripPreferences, preference]);
    } else {
      Alert.alert('Limit Reached', 'You can select up to 3 preferences only.');
    }
  };

  const handleSave = () => {
    if (!name) return Alert.alert('Error', 'Name is required.');
    if (config.showSurname && !surname)
      return Alert.alert('Error', 'Surname is required.');
    if (config.showEmail && !email)
      return Alert.alert('Error', 'Email is required.');
    if (config.showPassword && !password)
      return Alert.alert('Error', 'Password is required.');
    if (config.showConfirmPassword && password !== confirmPassword)
      return Alert.alert('Error', 'Passwords do not match.');

    if (config.showEmergencyContacts) {
      const phoneRegex = /^[0-9]{7,15}$/;
      for (let i = 0; i < contacts.length; i++) {
        if (!phoneRegex.test(contacts[i])) {
          return Alert.alert('Error', `Invalid emergency contact #${i + 1}.`);
        }
      }
    }

    Alert.alert('Success', 'Settings saved successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <BackButtonWithHeader
        Heading="Settings"
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.avatarContainer}>
        <Image
          source={
            typeof profileImage === 'string'
              ? {uri: profileImage}
              : profileImage
          }
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.addIcon} onPress={pickImage}>
          <Text style={styles.addIconText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={config.showSurname ? styles.halfInput : styles.fullInput}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="John"
          />
        </View>
        {config.showSurname && (
          <View style={styles.halfInput}>
            <Text style={styles.label}>Surname</Text>
            <TextInput
              style={styles.input}
              value={surname}
              onChangeText={setSurname}
              placeholder="Doe"
            />
          </View>
        )}
      </View>

      {config.showEmail && (
        <>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="john@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </>
      )}

      {config.showPassword && (
        <>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="••••••••"
          />
        </>
      )}

      {config.showConfirmPassword && (
        <>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholder="••••••••"
          />
        </>
      )}

      {config.showMobileNumber && (
        <>
          <Text style={styles.label}>Mobile Number</Text>
          <View style={styles.fullInput}>
            <InputFromUser
              phoneNumberOrEmail={mobileNumber}
              setInputValue={setMobileNumber}
            />
          </View>
        </>
      )}

      {config.showEmergencyContacts && (
        <>
          <Text style={styles.label}>Emergency Contact Number</Text>
          <TouchableOpacity
            style={[styles.addButton, contacts.length >= 3 && {opacity: 0.5}]}
            onPress={addContact}
            disabled={contacts.length >= 3}>
            <Text style={styles.addText}>+ Add Number</Text>
          </TouchableOpacity>
          {contacts.map((contact, index) => (
            <View key={index} style={styles.contactRowWithDelete}>
              <View style={styles.inputWithDelete}>
                <View style={styles.contactInputWrapper}>
                  <InputFromUser
                    phoneNumberOrEmail={contact}
                    setInputValue={text => updateContact(text, index)}
                  />
                </View>
                {contacts.length > 1 && (
                  <TouchableOpacity
                    onPress={() => deleteContact(index)}
                    style={styles.deleteIcon}>
                    <Icon name="delete" size={24} color="#FF4D4D" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </>
      )}

      {config.showShareLocation && (
        <View style={styles.switchSection}>
          <Text style={styles.switchHeading}>Share Location</Text>
          <Text style={styles.switchSubheading}>
            Share your location with 3 registered people
          </Text>
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Share Location</Text>
            <Switch
              value={shareLocation}
              onValueChange={setShareLocation}
              trackColor={{false: '#ccc', true: '#42D94C'}}
              thumbColor={shareLocation ? '#ffffff' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              style={styles.switch}
            />
          </View>
        </View>
      )}

      {config.showTripPreferences && (
        <>
          <Text style={styles.label}>Preference in the trip</Text>
          <View style={styles.preferenceBlock}>
            <View style={styles.selectedPrefsContainer}>
              {selectedTripPreferences.map((pref, idx) => (
                <View
                  key={idx}
                  style={{position: 'relative', width: '48%', marginBottom: 8}}>
                  <TouchableOpacity
                    style={styles.availablePrefButton}
                    onPress={() => togglePreference(pref)}>
                    <Text style={styles.availablePrefText}>{pref}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.crossButtonAbsolute}
                    onPress={() => togglePreference(pref)}>
                    <Icon name="close-circle" size={20} color="#000000" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.selectOptionsText}>Select up to 3 options</Text>
          <View style={styles.availablePrefsContainer}>
            {availableTripPreferences.map((pref, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.availablePrefButton}
                onPress={() => togglePreference(pref)}>
                <Text style={styles.availablePrefText}>{pref}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsComponent;
