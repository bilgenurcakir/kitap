import React from 'react';
import { View, Text, Button } from 'react-native';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:18, marginBottom:20 }}>Ayarlar</Text>
      <Button title="Tema Değiştir" onPress={() => alert('Tema değiştirildi')} />
      <Button title="Bildirim Ayarları" onPress={() => alert('Bildirim ayarları')} />
    </View>
  );
}
