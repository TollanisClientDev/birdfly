import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CancelButtonAdviseComponent = ({visible, onClose}) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header with Back Button and Title */}
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <FontAwesome5 name="arrow-left" size={20} color="#5A41F3" />
            </TouchableOpacity>
            <Text style={styles.title}>Why are you canceling?</Text>
          </View>

          {/* Fee Info */}
          <Text style={styles.feeText}>
            A cancellation fee of $2.50 will be charged.
          </Text>

          {/* Primary Action */}
          <TouchableOpacity style={styles.primaryButton} onPress={onClose}>
            <Text style={styles.primaryButtonText}>
              Keep going with the trip
            </Text>
          </TouchableOpacity>

          {/* Secondary Action */}
          <TouchableOpacity style={styles.secondaryButton} onPress={onClose}>
            <Text style={styles.secondaryButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5A41F3',
    textAlign: 'center',
    flex: 1,
  },
  feeText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  primaryButton: {
    backgroundColor: '#5A41F3',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#EAEAEA',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#5A41F3',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CancelButtonAdviseComponent;
