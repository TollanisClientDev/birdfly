import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CancelButtonAdviseComponent from '../layouts/CancelButtonAdviseComponent';

const CancelReasonComponent = ({navigation}) => {
  const reasons = [
    {id: '1', icon: 'close-circle', text: 'The driver is not approaching'},
    {id: '2', icon: 'time', text: "I'm waiting too long"},
    {id: '3', icon: 'person', text: 'I changed my mind'},
    {id: '4', icon: 'car', text: "I couldn't find the driver"},
    {id: '5', icon: 'shield-checkmark', text: 'Other'},
  ];

  const [modalVisible, setModalVisible] = useState(false);

  const renderReason = ({item}) => (
    <TouchableOpacity
      style={styles.reasonItem}
      onPress={() => setModalVisible(true)}>
      <Icon
        name={item.icon}
        size={24}
        color="#3F35CE"
        style={styles.reasonIcon}
      />
      <Text style={styles.reasonText}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Modal Component */}
      <CancelButtonAdviseComponent
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          navigation.navigate('Home');
        }}
      />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Why are you canceling?</Text>
        <TouchableOpacity>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Reason List */}
      <FlatList
        data={reasons}
        renderItem={renderReason}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.reasonList}
      />

      {/* Keep Going Button */}
      <TouchableOpacity
        style={styles.keepGoingButton}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.keepGoingButtonText}>Keep going with the trip</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3F35CE',
  },
  skipText: {
    fontSize: 16,
    color: '#3F35CE',
    paddingLeft: 20,
  },
  reasonList: {
    paddingHorizontal: 20,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  reasonIcon: {
    marginRight: 15,
  },
  reasonText: {
    fontSize: 16,
    color: 'black',
  },
  keepGoingButton: {
    backgroundColor: '#3F35CE',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  keepGoingButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CancelReasonComponent;
