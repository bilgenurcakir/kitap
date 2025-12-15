import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');

  const handleLogin = () => {
    // Login doğrulama burada yapılabilir

     navigation.replace('Home', { username }); // Giriş başarılı → Home Tabs
  };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text>Giriş Yap</Text>
      <TextInput 
        placeholder="Kullanıcı Adı" 
        value={username} 
        onChangeText={setUsername} 
        style={{ borderWidth:1, width:'80%', margin:10, padding:5 }}
      />
      <Button title="Giriş" onPress={handleLogin} />
    </View>
  );
}
