import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import SubmitScreen from '../screens/SubmitScreen';
import Submit2Modal from '../screens/Submit2Modal';


const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ title: 'About' }} />
        <Stack.Screen name="Submit" component={SubmitScreen} options={{ title: 'Submit' }} />
        <Stack.Screen
          name="Submit2"
          component={Submit2Modal}
          options={{ title: 'Submit2', presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

    