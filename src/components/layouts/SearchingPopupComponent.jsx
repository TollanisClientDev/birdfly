import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const facts = [
  'Drivers nearby are being located...',
  'Matching you with the best-rated driver...',
  'Ensuring route efficiency...',
  'Calculating optimal pickup point...',
  'Looking for available cars...',
];

const SearchingPopupComponent = ({visible, onCancel, onComplete}) => {
  const [randomFact, setRandomFact] = useState(facts[0]);

  useEffect(() => {
    let factInterval, timeout;

    if (visible) {
      factInterval = setInterval(() => {
        const index = Math.floor(Math.random() * facts.length);
        setRandomFact(facts[index]);
      }, 2000);

      timeout = setTimeout(() => {
        onComplete?.();
      }, 5000);
    }

    return () => {
      clearInterval(factInterval);
      clearTimeout(timeout);
    };
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.heading}>Searching for Drivers...</Text>
          <ActivityIndicator
            size="large"
            color="#3E35CE"
            style={styles.loader}
          />
          <Text style={styles.info}>{randomFact}</Text>
          <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SearchingPopupComponent;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#F2F1FF',
    borderRadius: 16,
    width: '85%',
    padding: 30,
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    color: '#3E35CE',
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  loader: {
    marginVertical: 20,
  },
  info: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 30,
  },
  cancelButton: {
    backgroundColor: '#3E35CE',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
