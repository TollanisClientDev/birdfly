import React from 'react';
import {View, Text, FlatList, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButtonWithHeader from '../common/BackButtonWithHeader';

const RaceHistoryComponent = ({navigation, rideHistoryData}) => {
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.provider}>{item.provider}</Text>

      <View style={styles.locationRow}>
        <Icon name="radio-button-off-outline" size={20} color="#3F35CE" />
        <Text style={styles.locationText}>{item.from}</Text>
        <Text style={styles.timeText}>{item.startTime}</Text>
      </View>

      <View style={styles.verticalLine} />

      <View style={styles.locationRow}>
        <Icon name="radio-button-on-outline" size={20} color="#3F35CE" />
        <Text style={styles.locationText}>{item.to}</Text>
        <Text style={styles.timeText}>{item.endTime}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total paid</Text>
        <Text style={styles.totalPaid}>{item.totalPaid}</Text>
      </View>

      <Pressable
        onPress={() =>
          navigation.navigate('RaceHistoryCompleteComponent', {trip: item})
        }
        style={styles.viewMoreWrapper}>
        <Text style={styles.viewMoreText}>View More</Text>
        <Icon name="arrow-forward-outline" size={16} color="#0062FF" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <BackButtonWithHeader
        Heading="Race History"
        onBackPress={() => navigation.goBack()}
      />
      <FlatList
        data={rideHistoryData}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  card: {
    backgroundColor: '#F2F1FF',
    padding: 16,
    borderRadius: 6,
    marginBottom: 10,
    marginTop: 20,
  },
  provider: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6538B5',
    marginBottom: 10,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  verticalLine: {
    height: 16,
    width: 2,
    backgroundColor: '#3F35CE',
    marginLeft: 9,
    marginBottom: 6,
  },
  locationText: {
    marginLeft: 8,
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#aaa',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalText: {
    fontWeight: 'bold',
    color: '#333',
  },
  totalPaid: {
    fontWeight: 'bold',
    color: '#333',
  },
  viewMoreWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  viewMoreText: {
    color: '#0062FF',
    marginRight: 6,
  },
});

export default RaceHistoryComponent;
