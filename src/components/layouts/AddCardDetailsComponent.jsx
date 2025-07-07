import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCardDetailsComponent = ({navigation}) => {
  const route = useRoute();
  const onCardAdded = route.params?.onCardAdded;

  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleExpiryChange = text => {
    const cleaned = text.replace(/[^\d]/g, '');
    let formatted = cleaned;
    if (cleaned.length >= 3) {
      formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    setExpiryDate(formatted);
  };

  const isValidExpiry = exp => {
    if (!/^\d{2}\/\d{2}$/.test(exp)) return false;
    const [mm, yy] = exp.split('/').map(Number);
    return mm >= 1 && mm <= 12;
  };

  const isValidCVV = val => /^\d{3,4}$/.test(val);

  const storeCardInAsyncStorage = async newCard => {
    try {
      const storedCards = await AsyncStorage.getItem('cards');
      const cards = storedCards ? JSON.parse(storedCards) : [];
      cards.push(newCard);
      await AsyncStorage.setItem('cards', JSON.stringify(cards));
    } catch (error) {
      console.error('Failed to save card to storage', error);
    }
  };

  const handleAddCard = async () => {
    const cleanedCardNumber = cardNumber.replace(/\s/g, '');

    if (!cleanedCardNumber || !expiryDate || !cvv) {
      Alert.alert(
        'Missing Details',
        'Please fill all card details before saving.',
      );
      return;
    }

    if (!isValidExpiry(expiryDate)) {
      Alert.alert('Invalid Expiry', 'Expiry must be in MM/YY format.');
      return;
    }

    if (!isValidCVV(cvv)) {
      Alert.alert('Invalid CVV', 'CVV must be 3 or 4 digits.');
      return;
    }

    const newCard = {
      id: Date.now().toString(),
      type: 'Credit Card',
      last4: cleanedCardNumber.slice(-4),
      selected: false,
      cardNumber: cleanedCardNumber,
      expiryDate,
      cvv,
    };

    await storeCardInAsyncStorage(newCard);
    onCardAdded?.(newCard);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <Icon name="close" size={28} color="#000000" />
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Card Number</Text>
        <View style={styles.cardInputContainer}>
          <Icon
            name="credit-card-outline"
            size={24}
            color="#999"
            style={styles.icon}
          />
          <TextInput
            style={styles.cardInput}
            placeholder="Credit/Debit Card"
            keyboardType="number-pad"
            value={cardNumber}
            onChangeText={setCardNumber}
            maxLength={19}
          />
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Expiry Date</Text>
            <TextInput
              style={styles.smallInput}
              placeholder="MM/YY"
              keyboardType="number-pad"
              value={expiryDate}
              onChangeText={handleExpiryChange}
              maxLength={5}
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Security Code</Text>
            <TextInput
              style={styles.smallInput}
              placeholder="CVV"
              secureTextEntry
              keyboardType="number-pad"
              value={cvv}
              onChangeText={setCvv}
              maxLength={4}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.addCardButton} onPress={handleAddCard}>
          <Text style={styles.addCardButtonText}>Add Card</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddCardDetailsComponent;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 50,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'relative',
    top: 10,
    left: 16,
    marginBottom: 50,
    zIndex: 10,
  },
  formContainer: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
    fontWeight: '500',
  },
  cardInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  cardInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  icon: {
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  smallInput: {
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  addCardButton: {
    backgroundColor: '#3F35CE',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  addCardButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
