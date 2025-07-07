import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  BackHandler,
  Image,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BirdCoinPage from '../../screens/Home/BirdCoinPage';

const {width, height} = Dimensions.get('window');

const HomeComponent = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('Trips');

  const recentTrips = [
    {id: '1', location: 'Oracle Park'},
    {id: '2', location: '943-929 Clay St'},
  ];

  useEffect(() => {
    const backAction = () => {
      if (selectedTab === 'Trips') {
        Alert.alert('Hold on!', 'Are you sure you want to exit?', [
          {text: 'Cancel', onPress: () => null, style: 'cancel'},
          {
            text: 'YES',
            onPress: async () => {
              await AsyncStorage.removeItem('UserToken');
              await AsyncStorage.removeItem('GoogleToken');
              await GoogleSignin.signOut();
              await GoogleSignin.revokeAccess();
              // BackHandler.exitApp(); // Uncomment if app exit is desired
            },
          },
        ]);
      } else {
        setSelectedTab('Trips');
      }
      return true;
    };

    // Uncomment below if using physical back button behavior on Android
    // const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    // return () => backHandler.remove();
  }, [selectedTab]);

  return (
    <View style={styles.container}>
      {selectedTab === 'Trips' ? (
        <>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../../assets/images/drawer_image.png')}
                style={styles.drawerImage}
              />
            </TouchableOpacity>
            <Image
              source={require('../../assets/images/home_bird_trip.png')}
              style={styles.logoImage}
            />
          </View>

          <ScrollView
            style={styles.bottomSheet}
            contentContainerStyle={{paddingBottom: 20}}>
            <TouchableOpacity
              style={styles.searchBar}
              onPress={() =>
                navigation.navigate('ChooseLocation', {
                  driverView: false,
                  isDirect: false,
                })
              }>
              <MaterialIcons name="search" size={30} color="#3F35CE" />
              <Text style={styles.searchText}>Where do we go now?</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Recent trips</Text>
            {recentTrips.map(trip => (
              <TouchableOpacity key={trip.id} style={styles.tripItem}>
                <View style={styles.historyIconContainer}>
                  <MaterialCommunityIcons
                    name="history"
                    size={18}
                    color="#6538B5"
                  />
                </View>
                <Text style={styles.tripText}>{trip.location}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>We have the best for you</Text>
            <View style={styles.promoContainer}>
              <TouchableOpacity style={styles.fullWidthPromo}>
                <Image
                  source={require('../../assets/images/home_image_one.png')}
                  style={styles.fullWidthImage}
                />
              </TouchableOpacity>
              <View style={styles.rowPromo}>
                <TouchableOpacity style={styles.promoCard}>
                  <Image
                    source={require('../../assets/images/home_image_two.png')}
                    style={styles.promoImage}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.promoCard}>
                  <Image
                    source={require('../../assets/images/home_image_three.png')}
                    style={styles.promoImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      ) : (
        <BirdCoinPage navigation={navigation} />
      )}

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[
            styles.navButton,
            selectedTab === 'Trips' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('Trips')}>
          <View style={styles.navContent}>
            <Image
              source={require('../../assets/images/trips_icon.png')}
              style={[
                styles.navIcon,
                {tintColor: selectedTab === 'Trips' ? '#3F35CE' : '#6D6A6A'},
              ]}
            />
            <Text
              style={[
                styles.navText,
                {color: selectedTab === 'Trips' ? '#3F35CE' : '#6D6A6A'},
              ]}>
              Trips
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            selectedTab === 'Bird Coin' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('Bird Coin')}>
          <View style={styles.navContent}>
            <Image
              source={require('../../assets/images/birdcoin.png')}
              style={styles.navIcon}
            />
            <Text
              style={[
                styles.navText,
                {color: selectedTab === 'Bird Coin' ? '#3F35CE' : '#6D6A6A'},
              ]}>
              Bird Coin
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3F35CE',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
    zIndex: 1,
  },
  menuButton: {
    position: 'absolute',
    left: 12,
  },
  drawerImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  logoImage: {
    width: 120,
    height: 30,
    resizeMode: 'contain',
  },
  bottomSheet: {
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    position: 'absolute',
    bottom: 60,
    width: '100%',
    maxHeight: height * 0.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderColor: '#4F46E5',
    borderWidth: 1,
    marginBottom: 15,
  },
  searchText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  sectionTitle: {
    fontSize: 16,
    marginVertical: 10,
    color: '#6538B5',
  },
  tripItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tripText: {
    fontSize: 14,
    color: '#6538B5',
  },
  historyIconContainer: {
    borderRadius: 20,
    padding: 6,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  fullWidthPromo: {
    width: '100%',
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fullWidthImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  rowPromo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promoCard: {
    width: '48%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  promoImage: {
    width: '100%',
    height: 156,
    resizeMode: 'cover',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#EAEAEA',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: width,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navButton: {
    alignItems: 'center',
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 5,
  },
  navText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4F46E5',
  },
});
