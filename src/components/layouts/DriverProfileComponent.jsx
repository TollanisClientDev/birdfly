import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Foundation from 'react-native-vector-icons/Foundation';

const {width} = Dimensions.get('window');
const purple = '#4F46E5';
const lightPurple = '#F5F3FF';

const driverData = {
  profilePic: require('../../assets/images/bruno_image.png'),
  reviewAvatar: {uri: 'https://randomuser.me/api/portraits/men/1.jpg'},
  vehicle: 'Toyota Corolla – Blue',
  name: 'Steven Smith',
  languages: ['Portuguese', 'English', 'Spanish'],
  favoritePlace: 'Búzios, Rio de Janeiro, Brazil',
  musicType: 'Eclectic',
  stats: {
    trips: '4140',
    review: '4.8',
  },
  yearsDriving: '3.2',
  curiosity: 'I like to listen to country music while driving.',
  totalMiles: '110 mi.',
  reviews: [
    {
      text: 'Polite and advised me on my visit to the city',
      ago: '5 months ago',
    },
    {
      text: 'Professional and very friendly',
      ago: '3 months ago',
    },
  ],
  carIcon: require('../../assets/images/profilecar.png'),
};

const DriverProfileComponent = ({navigation, isDriver = false}) => {
  const {
    profilePic,
    reviewAvatar,
    vehicle,
    name,
    languages,
    favoritePlace,
    musicType,
    stats,
    yearsDriving,
    curiosity,
    totalMiles,
    reviews,
    carIcon,
  } = driverData;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color={purple} />
          </TouchableOpacity>
          {isDriver && (
            <TouchableOpacity>
              <Feather name="heart" size={24} color={purple} />
            </TouchableOpacity>
          )}
        </View>

        <Image source={profilePic} style={styles.avatar} />
        {isDriver && <Text style={styles.vehicleText}>{vehicle}</Text>}
        <Text style={styles.nameText}>{name}</Text>

        <View style={styles.infoRow}>
          <Feather name="globe" size={20} color={purple} />
          <Text style={styles.infoText}>
            Speak{' '}
            {languages.map((lang, i) => (
              <Text key={lang}>
                <Text style={styles.infoBold}>{lang}</Text>
                {i < languages.length - 1
                  ? i === languages.length - 2
                    ? ' and '
                    : ', '
                  : ''}
              </Text>
            ))}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Feather name="map-pin" size={20} color={purple} />
          <Text style={styles.infoText}>
            Favorite place: <Text style={styles.infoBold}>{favoritePlace}</Text>
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Feather name="music" size={20} color={purple} />
          <Text style={styles.infoText}>
            Music Type: <Text style={styles.infoBold}>{musicType}</Text>
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statBox, {marginRight: 10}]}>
            <Text style={styles.statValue}>{stats.trips}</Text>
            <Text style={styles.statLabel}>Trips</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{stats.review}</Text>
            <Text style={styles.statLabel}>Review</Text>
          </View>
        </View>

        <View style={[styles.yearsBox, !isDriver && styles.centeredYearsBox]}>
          <View>
            <Text style={styles.yearsNumber}>{yearsDriving}</Text>
            <Text style={styles.yearsLabel}>years</Text>
          </View>
          {isDriver && <Image source={carIcon} style={styles.yearsCar} />}
        </View>

        <View style={styles.curiosityContainer}>
          <View style={styles.curiosityRow}>
            <Foundation name="lightbulb" size={16} color={'#6538B5'} />
            <Text style={styles.curiosityLabel}>A curiosity about me…</Text>
          </View>
          <Text style={styles.quote}>"{curiosity}"</Text>
        </View>

        <ImageBackground
          source={require('../../assets/images/drivertravelled.png')}
          style={styles.travelBg}>
          <Text style={styles.travelText}>
            {name} has traveled over{'\n'}
            <Text style={styles.travelNumber}>{totalMiles}</Text>
          </Text>
        </ImageBackground>

        {isDriver && (
          <View style={styles.reviewsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {reviews.map((r, i) => (
                <View key={i} style={styles.reviewCard}>
                  <View style={styles.reviewTopRow}>
                    <Text style={styles.reviewText}>{`“${r.text}”`}</Text>
                    <Image source={reviewAvatar} style={styles.reviewAvatar} />
                  </View>
                  <View style={styles.reviewBottomRow}>
                    <Text style={styles.reviewAgo}>{r.ago}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
  scroll: {alignItems: 'center', paddingBottom: 30},
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 10,
  },
  vehicleText: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  nameText: {
    fontSize: 26,
    fontWeight: '400',
    color: '#222',
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 20,
  },
  infoText: {marginLeft: 8, fontSize: 14, color: '#6538B5', flex: 1},
  infoBold: {color: '#6538B5', fontWeight: '600'},
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    width: '90%',
    paddingHorizontal: 20,
  },
  statBox: {
    flex: 1,
    backgroundColor: purple,
    borderRadius: 4,
    paddingVertical: 16,
    alignItems: 'center',
  },
  statValue: {fontSize: 22, fontWeight: '700', color: '#FFF'},
  statLabel: {fontSize: 14, color: '#FFF', marginTop: 4},
  yearsBox: {
    flexDirection: 'row',
    backgroundColor: '#D0E8F2',
    borderRadius: 8,
    marginTop: 16,
    padding: 16,
    width: width * 0.67,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centeredYearsBox: {
    justifyContent: 'center',
  },
  yearsNumber: {
    fontSize: 30,
    fontWeight: '600',
    color: purple,
    marginLeft: 20,
    textAlign: 'center',
  },
  yearsLabel: {
    fontSize: 20,
    color: purple,
    marginTop: 4,
    marginLeft: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  yearsCar: {
    width: 68,
    height: 104,
    resizeMode: 'contain',
  },
  curiosityContainer: {
    backgroundColor: lightPurple,
    borderRadius: 8,
    marginTop: 20,
    padding: 20,
    width: width - 40,
    alignItems: 'center',
  },
  curiosityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  curiosityLabel: {fontSize: 14, color: '#6538B5', marginLeft: 5},
  quote: {
    fontSize: 18,
    color: '#6538B5',
    textAlign: 'center',
    lineHeight: 26,
    marginLeft: 8,
  },
  travelBg: {
    marginTop: 24,
    width: width,
    height: 180,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  travelText: {
    fontSize: 20,
    color: purple,
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'flex-end',
    width: '65%',
  },
  travelNumber: {
    fontSize: 26,
    fontWeight: '700',
  },
  reviewsContainer: {
    marginTop: 24,
    height: 140,
  },
  reviewCard: {
    width: width * 0.7,
    borderWidth: 1,
    borderColor: purple,
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  reviewTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 16,
    color: '#222',
    lineHeight: 22,
    flex: 1,
  },
  reviewAvatar: {
    width: 36,
    height: 36,
    borderRadius: 16,
    marginLeft: 12,
  },
  reviewBottomRow: {
    marginTop: 4,
  },
  reviewAgo: {
    fontSize: 12,
    color: '#3F35CE',
  },
});

export default DriverProfileComponent;
