import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import BackButtonWithHeader from '../common/BackButtonWithHeader';

const {width} = Dimensions.get('window');

const NotificationComponent = ({navigation}) => {
  const notifications = [
    {
      id: 1,
      icon: 'party-popper',
      text: 'We have a special promotion for you!🥳',
      bgColor: '#3F35CE',
    },
    {
      id: 2,
      icon: 'clipboard-alert-outline',
      text: 'Please complete your informations🧾',
      bgColor: '#3F35CE',
    },
    {
      id: 3,
      icon: 'play-circle-outline',
      text: 'We have essential tips for you!😴',
      bgColor: '#EDEDED',
    },
    {
      id: 4,
      icon: 'party-popper',
      text: 'We have a special promotion for you!🥳',
      bgColor: '#3F35CE',
    },
    {
      id: 5,
      icon: 'clipboard-alert-outline',
      text: 'Please complete your informations🧾',
      bgColor: '#3F35CE',
    },
    {
      id: 6,
      icon: 'play-circle-outline',
      text: 'We have essential tips for you!😴',
      bgColor: '#EDEDED',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <BackButtonWithHeader
        Heading="Notifications"
        onBackPress={() => navigation.goBack()}
      />

      {/* Clear Notifications Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.clearButton}>
          <Text style={styles.clearText}>Clear notifications</Text>
          <Icon name="broom" size={18} color="#000" style={{marginLeft: 4}} />
        </TouchableOpacity>
      </View>

      {/* Notification List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        {notifications.map(item => {
          const isLightBg = item.bgColor === '#EDEDED';
          return (
            <View key={item.id} style={styles.notificationRow}>
              <View style={styles.dot} />
              <View
                style={[
                  styles.notificationBox,
                  {backgroundColor: item.bgColor},
                ]}>
                <View style={styles.iconBox}>
                  <Icon name={item.icon} size={30} color="#3F35CE" />
                </View>
                <Text
                  style={[
                    styles.notificationText,
                    {color: isLightBg ? '#000' : '#FFF'},
                  ]}>
                  {item.text}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default NotificationComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearText: {
    fontSize: 15,
    color: '#000',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: '#FF4747',
    borderRadius: 5,
    marginRight: 10,
  },
  notificationBox: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  iconBox: {
    width: 50,
    height: 50,
    backgroundColor: '#C7DFF5',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
  },
});
