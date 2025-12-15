// App.js (Tam Fonksiyonel 5 Ekranlı Yapı: Ekleme, Silme, Düzenleme Dahil)

import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { 
    View, Text, Button, StyleSheet, ScrollView, 
    TextInput, TouchableOpacity, Alert 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// ----------------------------------------------------------------------
// 1. ÖRNEK VERİ ve DURUM YÖNETİMİ
// ----------------------------------------------------------------------

const initialNotes = [
  {
    id: 1,
    title: "Matematik Dersi Notları",
    content: "Limit ve türev konuları önemli, özellikle L'Hôpital kuralına dikkat et. Çarşamba günü ek alıştırma çözülecek.",
    date: "15 Aralık 2025"
  },
  {
    id: 2,
    title: "Fizik Deney Raporu",
    content: "Dinamik deney sonuçları beklenenden yüksek çıktı. Hata payı hesaplamaları kontrol edilmeli. Enerji korunum ilkesini tekrar gözden geçir.",
    date: "10 Aralık 2025"
  },
];

// ----------------------------------------------------------------------
// 2. EKRAN BİLEŞENLERİ
// ----------------------------------------------------------------------

/**
 * HomeScreen: Ana Not Listesi
 */
const HomeScreen = ({ navigation, notes }) => {
  return (
    <View style={sharedStyles.container}>
      {/* Üst Kısım Menü Düğmeleri */}
      <View style={homeStyles.menuBar}>
         <TouchableOpacity 
            style={homeStyles.menuButton} 
            onPress={() => navigation.navigate('AddNote')}
        >
            <Text style={homeStyles.menuText}>+ Yeni Not Ekle</Text>
        </TouchableOpacity>
         <TouchableOpacity 
            style={homeStyles.menuButton} 
            onPress={() => navigation.navigate('Settings')}
        >
            <Text style={homeStyles.menuText}>⚙️ Ayarlar</Text>
        </TouchableOpacity>
      </View>

      <Text style={homeStyles.header}>📚 Tüm Notlarım ({notes.length})</Text>

      <ScrollView>
        {notes.length === 0 ? (
          <Text style={homeStyles.emptyText}>Henüz hiç not yok. Yeni bir not ekleyin!</Text>
        ) : (
          notes.map((note) => (
            <View key={note.id} style={homeStyles.noteCard}>
              <Text style={homeStyles.noteTitle}>{note.title}</Text>
              <Text style={homeStyles.noteDate}>{note.date}</Text>
              <Button
                title="Detayını Gör"
                onPress={() => navigation.navigate('Detail', { noteData: note })}
                color="#007AFF"
              />
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

/**
 * DetailScreen: Belirli Bir Notun Detayı (Silme ve Düzenlemeye Geçiş)
 */
const DetailScreen = ({ route, navigation, deleteNote }) => {
  const { noteData } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: noteData.title,
    });
  }, [navigation, noteData.title]);

  const handleDelete = () => {
    Alert.alert(
      'Notu Silme Onayı', 
      `'${noteData.title}' başlıklı notu silmek istediğinizden emin misiniz?`,
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil', 
          style: 'destructive', 
          onPress: () => {
            deleteNote(noteData.id);
            navigation.goBack(); // Listeye geri dön
            Alert.alert('Bilgi', 'Not başarıyla silindi.');
          }
        },
      ]
    );
  };

  return (
    <View style={sharedStyles.container}>
      <Text style={detailStyles.date}>Tarih: {noteData.date}</Text>
      <View style={detailStyles.contentBox}>
        <Text style={detailStyles.contentHeader}>Not İçeriği:</Text>
        <Text style={detailStyles.content}>{noteData.content}</Text>
      </View>

      <View style={detailStyles.buttonGroup}>
          <TouchableOpacity 
            style={[detailStyles.button, detailStyles.editButton]}
            onPress={() => navigation.navigate('EditNote', { 
              noteId: noteData.id, 
              currentTitle: noteData.title, 
              currentContent: noteData.content 
            })}
          >
              <Text style={detailStyles.buttonText}>✏️ Düzenle</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[detailStyles.button, detailStyles.deleteButton]}
            onPress={handleDelete}
          >
              <Text style={detailStyles.buttonText}>🗑️ Sil</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
};

/**
 * AddNoteScreen: Yeni Not Ekleme Formu
 */
const AddNoteScreen = ({ navigation, addNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Hata', 'Lütfen başlık ve içerik alanlarını doldurun.');
      return;
    }
    
    addNote(title, content);

    Alert.alert('Başarılı', `'${title}' notu başarıyla eklendi!`);
    navigation.goBack(); 
  };

  return (
    <View style={sharedStyles.container}>
      <Text style={formStyles.label}>Not Başlığı:</Text>
      <TextInput
        style={formStyles.input}
        placeholder="Örn: Kimya Ödevi"
        value={title}
        onChangeText={setTitle}
      />
      
      <Text style={formStyles.label}>Not İçeriği:</Text>
      <TextInput
        style={formStyles.textArea}
        placeholder="Notunuzu buraya yazın..."
        multiline={true}
        numberOfLines={6}
        value={content}
        onChangeText={setContent}
      />

      <Button
        title="Notu Kaydet"
        onPress={handleSave}
        color="#28A745" // Yeşil Kaydet Butonu
      />
    </View>
  );
};


/**
 * EditNoteScreen: Mevcut Notu Düzenleme Formu
 */
const EditNoteScreen = ({ route, navigation, updateNote }) => {
    // DetailScreen'den gelen verileri alıyoruz
    const { noteId, currentTitle, currentContent } = route.params; 
    
    // Form durumunu mevcut not verileriyle başlatıyoruz
    const [title, setTitle] = useState(currentTitle);
    const [content, setContent] = useState(currentContent);

    const handleSave = () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Hata', 'Lütfen başlık ve içerik alanlarını doldurun.');
            return;
        }
        
        // App bileşenindeki updateNote fonksiyonunu çağır
        updateNote(noteId, title, content);

        Alert.alert('Başarılı', 'Not başarıyla güncellendi!');
        // Hem EditNote ekranını hem de DetailScreen'i Stack'ten kaldırıp Home'a dön
        navigation.popToTop(); 
    };

    return (
        <View style={sharedStyles.container}>
            <Text style={formStyles.label}>Not Başlığı:</Text>
            <TextInput
                style={formStyles.input}
                placeholder="Başlık"
                value={title}
                onChangeText={setTitle}
            />
            
            <Text style={formStyles.label}>Not İçeriği:</Text>
            <TextInput
                style={formStyles.textArea}
                placeholder="İçerik"
                multiline={true}
                numberOfLines={6}
                value={content}
                onChangeText={setContent}
            />

            <Button
                title="Değişiklikleri Kaydet"
                onPress={handleSave}
                color="#007AFF"
            />
        </View>
    );
};


/**
 * SettingsScreen: Ayarlar/Hakkında Ekranı
 */
const SettingsScreen = () => {
  return (
    <View style={sharedStyles.container}>
      <View style={settingsStyles.infoBox}>
        <Text style={settingsStyles.header}>⚙️ Uygulama Ayarları</Text>
        <Text style={settingsStyles.text}>Versiyon: 1.1.0</Text>
        <Text style={settingsStyles.separator}></Text>
        <Text style={settingsStyles.note}>Notlar geçici olarak uygulama belleğinde (state) saklanmaktadır.</Text>
      </View>
    </View>
  );
};

// ----------------------------------------------------------------------
// 3. STYLESHEETS (STİL TANIMLARI)
// ----------------------------------------------------------------------

const sharedStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f8f8f8',
    },
});

const homeStyles = StyleSheet.create({
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
        textAlign: 'center',
    },
    menuBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    menuButton: {
        padding: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    menuText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    noteCard: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 5,
        color: '#007AFF',
    },
    noteDate: {
        fontSize: 12,
        color: '#888',
        marginBottom: 10,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 16,
        color: '#888',
    }
});

const detailStyles = StyleSheet.create({
    date: {
        fontSize: 14,
        color: '#888',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 10,
    },
    contentBox: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        borderLeftWidth: 5,
        borderLeftColor: '#007AFF',
        minHeight: 150,
        marginBottom: 30,
    },
    contentHeader: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        color: '#555',
    },
    content: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        padding: 12,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    editButton: {
        backgroundColor: '#FFA500', // Turuncu
    },
    deleteButton: {
        backgroundColor: '#DC3545', // Kırmızı
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});

const formStyles = StyleSheet.create({
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 5,
        color: '#333',
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        marginBottom: 15,
    },
    textArea: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        fontSize: 16,
        marginBottom: 20,
        textAlignVertical: 'top', 
        height: 150,
    }
});

const settingsStyles = StyleSheet.create({
    infoBox: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginTop: 30,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#007AFF',
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
        color: '#555',
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        marginVertical: 15,
    },
    note: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#888',
        textAlign: 'center',
    }
});


// ----------------------------------------------------------------------
// 4. ANA BİLEŞEN ve NAVİGASYON KURULUMU
// ----------------------------------------------------------------------

const Stack = createStackNavigator();

const App = () => {
    const [notes, setNotes] = useState(initialNotes);

    // Yeni Not Ekleme Fonksiyonu
    const addNote = (title, content) => {
        const newNote = {
            id: Date.now(),
            title,
            content,
            date: new Date().toLocaleDateString('tr-TR'),
        };
        setNotes([newNote, ...notes]);
    };

    // Not Silme Fonksiyonu
    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    // Not Düzenleme Fonksiyonu
    const updateNote = (id, newTitle, newContent) => {
        setNotes(
            notes.map(note => 
                note.id === id 
                    ? { 
                        ...note, 
                        title: newTitle, 
                        content: newContent, 
                        date: new Date().toLocaleDateString('tr-TR') + " (Düzenlendi)" // Güncelleme bilgisini ekle
                      } 
                    : note
            )
        );
    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: { backgroundColor: '#007AFF' },
                    headerTintColor: '#fff',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            >
                {/* 1. Ana Ekran - Not Listesi */}
                <Stack.Screen name="Home" options={{ title: 'Öğrenci Not Defteri' }}>
                    {(props) => <HomeScreen {...props} notes={notes} />} 
                </Stack.Screen>

                {/* 2. Not Detayı (Silme işlevini kullanır) */}
                <Stack.Screen name="Detail" options={{ title: 'Not Detayı' }}>
                    {(props) => <DetailScreen {...props} deleteNote={deleteNote} />}
                </Stack.Screen>

                {/* 3. Yeni Not Ekleme */}
                <Stack.Screen name="AddNote" options={{ title: 'Yeni Not Oluştur' }}>
                    {(props) => <AddNoteScreen {...props} addNote={addNote} />}
                </Stack.Screen>

                {/* 4. Not Düzenleme (Düzenleme işlevini kullanır) */}
                <Stack.Screen name="EditNote" options={{ title: 'Notu Düzenle' }} component={EditNoteScreen}>
                    {(props) => <EditNoteScreen {...props} updateNote={updateNote} />}
                </Stack.Screen>

                {/* 5. Ayarlar Ekranı */}
                <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Ayarlar' }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;