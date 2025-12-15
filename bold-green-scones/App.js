import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/loginScreen.jsx';
import BooksScreen from './screens/BooksScreen.jsx';
import StatusScreen from './screens/StatusScreen.jsx';
import SettingsScreen from './screens/SettingsScreen.jsx';
import DetailScreen from './screens/DetailsScreen.jsx';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator: Books / Status / Settings
function HomeTabs({ route }) {
  const { username } = route.params; // Login'den gelen veri

  return (
    <Tab.Navigator>
      <Tab.Screen name="Books">
        {(props) => <BooksScreen {...props} username={username} />}
      </Tab.Screen>
      <Tab.Screen name="Status" component={StatusScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
        <Stack.Screen 
          name="Detail" 
          component={DetailScreen} 
          options={({ route }) => ({
            title: route.params?.bookTitle || 'Kitap Detayı',
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
