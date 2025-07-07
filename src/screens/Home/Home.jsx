import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, StyleSheet, Alert, Text} from 'react-native';
import HomeComponent from '../../components/layouts/HomeComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserToken = async () => {
      try {
        const token = await AsyncStorage.getItem('UserToken');
        setUserToken(token);
      } catch (error) {
        console.error('Error fetching user token:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserToken();
  }, []);

  useEffect(() => {
    if (!isLoading && !userToken) {
      Alert.alert('Please', 'Login First !!', [
        {
          text: 'Cancel',
          onPress: () => navigation.navigate('PrincipalLogin'),
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => {
            AsyncStorage.removeItem('UserToken');
            navigation.navigate('Login');
          },
        },
      ]);
    }
  }, [isLoading, userToken, navigation]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!userToken) return null;

  return (
    <SafeAreaView style={styles.container}>
      <HomeComponent navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default Home;
