import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import SubmitScreen from './screens/SubmitScreen';
import Submit2Modal from './screens/Submit2Modal';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator 
              initialRouteName="Home"
              screenOptions={{
                headerShown: true,
                cardStyle: { backgroundColor: 'white' }
              }}
            >
              <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ title: 'Home' }}
              />
              <Stack.Screen 
                name="About" 
                component={AboutScreen} 
                options={{ title: 'About' }}
              />
              <Stack.Screen 
                name="Submit" 
                component={SubmitScreen} 
                options={{ title: 'Submit' }}
              />
              <Stack.Screen
                name="Submit2"
                component={Submit2Modal}
                options={{
                  title: 'Submit2',
                  presentation: 'modal'
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </View>
  );
}
