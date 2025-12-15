import React from 'react';
import { View, Text, Button } from 'react-native';

const books = [
  { id: '1', title: 'Kitap 1', author: 'Yazar 1' },
  { id: '2', title: 'Kitap 2', author: 'Yazar 2' },
  { id: '3', title: 'Kitap 3', author: 'Yazar 3' },
];

export default function DetailScreen({ route, navigation }) {
  const { bookId } = route.params;
  const book = books.find(b => b.id === bookId);

  if (!book) return <Text>Kitap bulunamadı</Text>;

  return (
    <View style={{ flex:1, padding:20 }}>
      <Text style={{ fontSize:22 }}>{book.title}</Text>
      <Text style={{ fontSize:18, marginVertical:10 }}>Yazar: {book.author}</Text>
      <Button title="Geri Dön" onPress={() => navigation.goBack()} />
    </View>
  );
}
