import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Ekran İmportları (Dosya yollarının projenle aynı olduğundan emin ol)
import LoginScreen from "./screens/loginScreen.jsx";
import BooksScreen from "./screens/BooksScreen.jsx";
import StatusScreen from "./screens/StatusScreen.jsx";
import SettingsScreen from "./screens/SettingsScreen.jsx";
import DetailScreen from "./screens/DetailsScreen.jsx";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ----------------------------------------------------------------------
// TAB NAVIGATOR (Books / Status / Settings)
// ----------------------------------------------------------------------
function HomeTabs({ route }) {
  // [BUG 3 - Params Bug]:
  // Login ekranından 'username' adında veri gönderiliyor.
  // Ancak burada 'kullaniciAdi' olarak karşılanıyor.
  // SONUÇ: BooksScreen'e giden veri undefined olur, isim görünmez.
  const { kullaniciAdi } = route.params || {};

  return (
    <Tab.Navigator>
      <Tab.Screen name="Books">
        {(props) => <BooksScreen {...props} username={kullaniciAdi} />}
      </Tab.Screen>
      <Tab.Screen name="Status" component={StatusScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

// ----------------------------------------------------------------------
// ANA UYGULAMA (STACK NAVIGATOR)
// ----------------------------------------------------------------------
export default function App() {
  return (
    <NavigationContainer>
      {/* [BUG 2 - Action/Flow Bug]: 
        initialRouteName="Login" olması gerekirken "Home" yapıldı.
        SONUÇ: Uygulama açılınca Login ekranını (ve veri girişini) atlayıp 
        direkt Home'a gitmeye çalışır. Parametre eksikliği yüzünden hata verebilir.
      */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />

        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          // [BUG 1 - Rota/Screen Name Bug]:
          // Screen name "Detail" olması gerekirken "KitapDetayi" yapıldı.
          // BooksScreen içindeki buton navigate('Detail') çağırdığı için eşleşmeyecek.
          // SONUÇ: "The action 'NAVIGATE' ... was not handled by any navigator" hatası.
          name="KitapDetayi"
          component={DetailScreen}
          options={({ route }) => ({
            title: route.params?.bookTitle || "Kitap Detayı",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
