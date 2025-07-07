import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ICON_COLOR = '#6538B5';

export default function UserDrawerComponent({navigation}) {
  return (
    <View style={styles.container}>
      {/* BACK BUTTON */}
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.closeDrawer()}>
        <Ionicons name="arrow-back" size={20} color={ICON_COLOR} />
      </TouchableOpacity>

      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DriverProfile', {isDriver: false})
          }>
          <Image
            source={require('../../assets/images/bruno_image.png')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.greeting}>Hi, Bruno!</Text>
      </View>

      {/* MENU */}
      <ScrollView contentContainerStyle={styles.menuContainer}>
        <DrawerItem
          icon={<Ionicons name="person" size={20} color={ICON_COLOR} />}
          label="Profile"
          onPress={() =>
            navigation.navigate('DriverProfile', {isDriver: false})
          }
        />
        <DrawerItem
          icon={
            <MaterialIcons name="notifications" size={20} color={ICON_COLOR} />
          }
          label="Notifications"
          onPress={() => navigation.navigate('Notifications')}
        />
        <DrawerItem
          icon={
            <MaterialCommunityIcons
              name="steering"
              size={20}
              color={ICON_COLOR}
            />
          }
          label="Race history"
          onPress={() => navigation.navigate('RaceHistory')}
        />
        <DrawerItem
          icon={
            <MaterialCommunityIcons
              name="wallet-plus"
              size={20}
              color={ICON_COLOR}
            />
          }
          label="Wallet"
          onPress={() =>
            navigation.navigate('AddWalletDetails', {isFromDashboard: true})
          }
        />
        <DrawerItem
          icon={<Ionicons name="people" size={20} color={ICON_COLOR} />}
          label="My favourite drivers"
          onPress={() => navigation.navigate('ChatScreen')}
        />
        <DrawerItem
          icon={<Ionicons name="videocam" size={20} color={ICON_COLOR} />}
          label="Videos"
          onPress={() => navigation.navigate('Video')}
        />
        <DrawerItem
          icon={<FontAwesome5 name="qrcode" size={20} color={ICON_COLOR} />}
          label="Read QR code"
          onPress={() =>
            Alert.alert('QR Code Reader', 'This feature is under development.')
          }
        />
        <DrawerItem
          icon={<MaterialIcons name="mail" size={20} color={ICON_COLOR} />}
          label="Support"
          onPress={() => navigation.navigate('Reports')}
        />
        <DrawerItem
          icon={<Ionicons name="settings" size={20} color={ICON_COLOR} />}
          label="Settings"
          onPress={() => navigation.navigate('Settings')}
        />

        {/* TERMS + EXIT */}
        <View style={styles.lastRowContainer}>
          <TouchableOpacity
            style={[styles.menuItem, styles.lastRowItem]}
            onPress={() =>
              navigation.navigate('TermsAndConditions', {
                showBottomButtons: false,
                checkboxText: 'None',
              })
            }>
            <Text style={styles.menuItemText}>Terms</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.lastRowItem]}
            onPress={() => navigation.navigate('SplashScreen')}>
            <Text style={[styles.menuItemText, {marginLeft: -50}]}>Exit</Text>
            <Ionicons
              name="exit"
              size={20}
              color="red"
              style={{marginLeft: 8}}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const DrawerItem = ({icon, label, onPress}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    {icon}
    <Text style={styles.menuItemText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButtonContainer: {
    marginTop: 66,
    marginLeft: 25,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F1FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 118,
    height: 116,
    borderRadius: 40,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    marginLeft: 23,
    justifyContent: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '85%',
  },
  menuItemText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#000',
  },
  lastRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    marginLeft: -10,
  },
  lastRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 4,
    width: '40%',
  },
});
