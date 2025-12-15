import React, { useState } from 'react';
import { View, Text, FlatList, Switch } from 'react-native';

const booksStatus = [
  { id: '1', title: 'Kitap 1', read: false },
  { id: '2', title: 'Kitap 2', read: true },
  { id: '3', title: 'Kitap 3', read: false },
];

export default function StatusScreen() {
  const [status, setStatus] = useState(booksStatus);

  const toggleRead = (id) => {
    setStatus(prev => prev.map(b => b.id === id ? { ...b, read: !b.read } : b));
  };

  return (
    <View style={{ flex:1, padding:10 }}>
      <Text style={{ fontSize:18, marginBottom:10 }}>Okundu / Okunmadı</Text>
      <FlatList 
        data={status}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection:'row', justifyContent:'space-between', padding:10, borderWidth:1, marginBottom:5 }}>
            <Text>{item.title}</Text>
            <Switch value={item.read} onValueChange={() => toggleRead(item.id)} />
          </View>
        )}
      />
    </View>
  );
}
