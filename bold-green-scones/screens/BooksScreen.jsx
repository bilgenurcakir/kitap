import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function BooksScreen({ navigation, username }) {
  const books = [
    { id: '1', title: 'Kitap 1' },
    { id: '2', title: 'Kitap 2' },
    { id: '3', title: 'Kitap 3' },
  ];

  return (
    <View style={{ flex:1, padding:10 }}>
      <Text style={{ fontSize:18, marginBottom:10 }}>Hoşgeldin, {username}</Text>
      <Text style={{ fontSize:18, marginBottom:10 }}>Kitap Listesi</Text>
      {books.map((item) => (
        <TouchableOpacity 
          key={item.id}
          style={{ padding:10, borderWidth:1, marginBottom:5 }}
          onPress={() => navigation.navigate('Detail', { bookId: item.id, bookTitle: item.title })}
        >
          <Text>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
