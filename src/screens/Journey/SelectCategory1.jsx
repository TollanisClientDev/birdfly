import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectCategory1Component from '../../components/layouts/SelectCategory1Component';

const APPLE_PAY_ID = 'applepay';

const SelectCategory1 = ({navigation, route}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [applePaySelected, setApplePaySelected] = useState(false);

  const loadSelectedCard = useCallback(async () => {
    try {
      const selectedCardId = await AsyncStorage.getItem('selectedCardId');
      if (selectedCardId === APPLE_PAY_ID) {
        setApplePaySelected(true);
        setSelectedCard(null);
      } else if (selectedCardId) {
        const storedCards = await AsyncStorage.getItem('cards');
        const parsedCards = storedCards ? JSON.parse(storedCards) : [];
        const card = parsedCards.find(card => card.id === selectedCardId);
        setSelectedCard(card || null);
        setApplePaySelected(false);
      } else {
        setSelectedCard(null);
        setApplePaySelected(false);
      }
    } catch (error) {
      setSelectedCard(null);
      setApplePaySelected(false);
      console.error('Error loading selected card:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadSelectedCard();
    }, [loadSelectedCard, route?.params?.refresh]),
  );

  return (
    <SelectCategory1Component
      navigation={navigation}
      route={route}
      selectedCardFromWallet={selectedCard}
      applePaySelected={applePaySelected}
    />
  );
};

export default SelectCategory1;
