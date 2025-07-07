import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const APPLE_PAY_ID = 'applepay';

const AddWalletDetailsComponent = ({route, isFromDashboard}) => {
  const defaultData = {
    birdCoin: {balance: 126.5, enabled: true},
    cards: [
      {id: '1', type: 'Credit Card', last4: '2128', selected: false},
      {id: '2', type: 'Credit Card', last4: '2244', selected: false},
    ],
    applePay: {enabled: true, selected: false},
  };

  const data = route?.params?.data ?? defaultData;
  const navigation = useNavigation();

  const [birdCoinEnabled, setBirdCoinEnabled] = useState(
    data?.birdCoin?.enabled ?? false,
  );
  const [cards, setCards] = useState(data?.cards ?? []);
  const [applePaySelected, setApplePaySelected] = useState(false);

  useEffect(() => {
    const loadCardsFromStorage = async () => {
      try {
        const storedCards = await AsyncStorage.getItem('cards');
        const selectedCardId = await AsyncStorage.getItem('selectedCardId');
        const parsedCards = storedCards ? JSON.parse(storedCards) : [];

        let updatedCards = parsedCards.map(card => ({
          ...card,
          selected: card.id === selectedCardId,
        }));

        if (updatedCards.length === 1) {
          updatedCards = updatedCards.map(card => ({...card, selected: true}));
          await AsyncStorage.setItem('selectedCardId', updatedCards[0].id);
        }

        setCards(updatedCards);
        setApplePaySelected(selectedCardId === APPLE_PAY_ID);
      } catch (error) {
        console.error('Error loading cards:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadCardsFromStorage);
    return unsubscribe;
  }, [navigation]);

  const handleBirdCoinToggle = value => setBirdCoinEnabled(value);

  const handleDeleteCard = async id => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to delete this card?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const filteredCards = cards.filter(card => card.id !== id);
            setCards(filteredCards);
            await AsyncStorage.setItem('cards', JSON.stringify(filteredCards));

            const selectedCardId = await AsyncStorage.getItem('selectedCardId');
            if (selectedCardId === id) {
              await AsyncStorage.removeItem('selectedCardId');
            }

            if (!isFromDashboard) {
              navigation.navigate('SelectCategory1', {refresh: Date.now()});
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleCardSelection = async id => {
    const selectedCard = cards.find(card => card.id === id);
    const updatedCards = cards.map(card =>
      card.id === id ? {...card, selected: true} : {...card, selected: false},
    );
    setCards(updatedCards);
    setApplePaySelected(false);
    await AsyncStorage.setItem('selectedCardId', id);

    if (!isFromDashboard) {
      navigation.navigate('SelectCategory1', {selectedCard});
    }
  };

  const handleApplePaySelection = async () => {
    const updatedCards = cards.map(card => ({...card, selected: false}));
    setCards(updatedCards);
    const newApplePaySelected = !applePaySelected;
    setApplePaySelected(newApplePaySelected);

    if (newApplePaySelected) {
      await AsyncStorage.setItem('selectedCardId', APPLE_PAY_ID);
      if (!isFromDashboard) {
        navigation.navigate('SelectCategory1');
      }
    } else {
      await AsyncStorage.removeItem('selectedCardId');
    }
  };

  const handleAddCardPress = () => {
    navigation.navigate('AddCardDetails', {
      onCardAdded: handleCardAdded,
    });
  };

  const handleCardAdded = async newCard => {
    if (!newCard.last4 || newCard.last4.trim() === '') {
      Alert.alert(
        'Invalid Card',
        'Please enter a valid card number before saving.',
      );
      return;
    }
    const updatedCards = [...cards, newCard].map(card =>
      card.id === newCard.id
        ? {...card, selected: true}
        : {...card, selected: false},
    );
    setCards(updatedCards);
    await AsyncStorage.setItem('cards', JSON.stringify(updatedCards));
    await AsyncStorage.setItem('selectedCardId', newCard.id);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <Icon name="close" size={28} color="#3F35CE" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.birdCoinContainer}>
          <View style={styles.birdCoinLeft}>
            <Text style={styles.birdCoinTitle}>Bird Coin</Text>
            <View style={styles.birdCoinRow}>
              <Image
                source={require('../../assets/images/birdcoin.png')}
                style={styles.birdCoinImage}
                resizeMode="contain"
              />
              <Text style={styles.birdCoinBalance}>
                {data?.birdCoin?.balance?.toFixed(2) ?? '0.00'}
              </Text>
            </View>
            <Text style={styles.birdCoinSubtitle}>
              Authorize your Bird Coin balance for races
            </Text>
          </View>
          <Switch
            trackColor={{false: '#2D2D2D', true: '#00FF00'}}
            thumbColor={birdCoinEnabled ? '#FFFFFF' : '#f4f3f4'}
            onValueChange={handleBirdCoinToggle}
            value={birdCoinEnabled}
          />
        </View>

        {cards.map(item => (
          <View
            key={item.id}
            style={[
              styles.cardContainer,
              item.selected && styles.cardSelected,
            ]}>
            <TouchableOpacity
              style={styles.cardTextContainer}
              onPress={() => handleCardSelection(item.id)}>
              <View style={styles.cardLeft}>
                <Image
                  source={require('../../assets/images/creditcard.png')}
                  style={styles.cardImage}
                  resizeMode="contain"
                />
                <Text style={styles.cardTitle}>
                  {item.type ?? 'Credit Card'}
                </Text>
              </View>
              <Text style={styles.cardNumber}>
                {`•••• ${item.last4 ?? 'XXXX'}`}
              </Text>
            </TouchableOpacity>

            <View style={styles.cardIconsRow}>
              <TouchableOpacity onPress={() => handleCardSelection(item.id)}>
                <Icon
                  name={
                    item.selected
                      ? 'checkbox-blank-circle'
                      : 'checkbox-blank-circle-outline'
                  }
                  size={24}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteIconWrapper}
                onPress={() => handleDeleteCard(item.id)}>
                <Icon name="trash-can-outline" size={24} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.addCardButton}
          onPress={handleAddCardPress}>
          <Icon
            name="plus"
            size={20}
            color="#3F35CE"
            style={{marginRight: 8}}
          />
          <Text style={styles.addCardText}>Add credit/debit card</Text>
        </TouchableOpacity>

        {data?.applePay?.enabled && (
          <TouchableOpacity
            style={[
              styles.applePayContainer,
              applePaySelected && styles.applePaySelected,
            ]}
            onPress={handleApplePaySelection}>
            <Icon
              name="apple"
              size={24}
              color="#000"
              style={styles.appleIcon}
            />
            <Text style={styles.applePayText}>Apple Pay</Text>
            <Icon
              name={
                applePaySelected
                  ? 'checkbox-blank-circle'
                  : 'checkbox-blank-circle-outline'
              }
              size={24}
              color="#000000"
            />
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddWalletDetailsComponent;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: 40,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  birdCoinContainer: {
    flexDirection: 'row',
    backgroundColor: '#3F35CE',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  birdCoinLeft: {
    flex: 1,
  },
  birdCoinTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  birdCoinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  birdCoinImage: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  birdCoinBalance: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  birdCoinSubtitle: {
    color: '#7970FF',
    fontSize: 12,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6538B5',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  cardSelected: {
    borderWidth: 2,
    borderColor: '#FFDF7E',
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 10,
    height: 10,
    marginRight: 8,
  },
  cardTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  addCardButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#3F35CE',
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 32,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCardText: {
    color: '#3F35CE',
    fontSize: 16,
    fontWeight: '600',
  },
  applePayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 4,
  },
  applePaySelected: {
    backgroundColor: '#E3E1FA',
  },
  appleIcon: {
    marginRight: 8,
  },
  applePayText: {
    flex: 1,
    fontSize: 16,
    color: '#3F35CE',
    fontWeight: '600',
  },
  closeButton: {
    position: 'relative',
    top: 10,
    marginBottom: 20,
    left: 16,
    zIndex: 10,
  },
  cardIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deleteIconWrapper: {
    padding: 4,
  },
});
