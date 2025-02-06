// HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { auth } from './firebase';

const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    auth.signOut().then(() => {
      navigation.navigate('Login');
    }).catch((error) => {
      console.error("Error logging out: ", error);
    });
  };

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Create a Post" onPress={() => navigation.navigate('Post')} />
      <Button title="View Feed" onPress={() => navigation.navigate('Feed')} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
