import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatCard from '../../components/layouts/ChatCardComponent';
import BackButtonWithHeader from '../../components/common/BackButtonWithHeader';

const ChatScreen = ({navigation}) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    const existingFavorites = await AsyncStorage.getItem('favoriteDrivers');
    const favoriteDrivers = existingFavorites
      ? JSON.parse(existingFavorites)
      : [];
    const usersList = favoriteDrivers.map(driverName => ({
      name: driverName,
      phone: '+12025550789',
      isActive: true,
      image: {uri: 'https://randomuser.me/api/portraits/men/3.jpg'},
    }));
    setUsers(usersList);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async name => {
    await fetchUsers();
  };

  return (
    <SafeAreaView style={{flex: 1, marginTop: 30, backgroundColor: '#F5F4FA'}}>
      <BackButtonWithHeader
        Heading="My Favourite Drivers"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView>
        {users.map((user, index) => (
          <ChatCard key={index} user={user} onDelete={handleDelete} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatScreen;
