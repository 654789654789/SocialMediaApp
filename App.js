// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import PostScreen from './PostScreen';
import FeedScreen from './FeedScreen';
import CommentScreen from './CommentScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="Comments" component={CommentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
