import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import LoginScreen from './loginScreen';
import BookScreen from './BookScreen';
import DetailScreen from './DetailScreen';
import StatusScreen from './StatusScreen';
import SettingScreens from './SettingScreens';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const BookStack = createNativeStackNavigator();


// 📚 Books + Detail Stack (AYNI KLASÖR)
function BooksStackScreen() {
  return (
    <BookStack.Navigator>
      <BookStack.Screen 
        name="Books"
        component={BookScreen}
        options={{ title: 'Kitap Listesi' }}
      />
      <BookStack.Screen
        name="Detail"
        component={DetailScreen}
        options={({ route }) => ({
          title: route.params?.bookTitle || 'Kitap Detayı',
        })}
      />
    </BookStack.Navigator>
  );
}


// 🏠 Bottom Tabs
function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="BooksTab"
        component={BooksStackScreen}
        options={{ title: 'Kitaplar', headerShown: false }}
      />
      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={{ title: 'Durum' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreens}
        options={{ title: 'Ayarlar' }}
      />
    </Tab.Navigator>
  );
}


// 🚀 Root Navigation
export default function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
