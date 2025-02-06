import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import supabase from '@/DBconfig/supabaseClient';
import { useAuth } from '@/provider/AuthProvider';
import { FileObject } from '@supabase/storage-js';
import { decode } from 'base64-arraybuffer';

export default function EnquiryScreen() {
  const { user } = useAuth();
  const [files, setFiles] = useState<FileObject[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [topSpeed, setTopSpeed] = useState('');
  const [carType, setCarType] = useState('');
  const [passCapacity, setPassCapacity] = useState('');
  const [showroom, setShowroom] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

  const [path, setPath] = useState('')


  const getUrl = async () => {
    const {data} = supabase.storage.from('images').getPublicUrl(imagePath as any)
    setPath(data.publicUrl)
  }

  const chooseImageFromGallery = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    };
  
    const result = await ImagePicker.launchImageLibraryAsync(options);
  
    if (result.canceled) return;
  
    const img = result.assets[0];
    setImageUri(img.uri);
  
    try {
      const base64 = await FileSystem.readAsStringAsync(img.uri, { encoding: 'base64' });
      const fileName = img.uri.split('/').pop();
      const filepath = `public/${fileName}`;
  
      const { data, error } = await supabase.storage
        .from('images')
        .upload(filepath, decode(base64), { contentType: 'image/png' });
  
      if (error) {
        console.error('Upload Error:', error);
        Alert.alert('Upload Failed', error.message);
      } else {
        console.log('Upload Success:', data);
  
        // Get the public URL after upload
        const { data: urlData, error: urlError  } = supabase.storage.from('images').getPublicUrl(filepath);
  
        if (urlError) {
          console.error('URL Error:', urlError);
          Alert.alert('URL Fetch Failed', urlError.message);
        } else {
          const imageUrl = urlData.publicUrl;
          setImagePath(filepath); // Update the image path
          setPath(imageUrl); // Set the URL for the logo
          setFiles([...files, data as any]);
  
          console.log('Public URL:', imageUrl);
        }
      }
    } catch (err) {
      console.error('File upload error:', err);
    }
  };
  
  const insertVehicle = async () => {
    if (!name || !path || !price || !carType || !passCapacity || !topSpeed || !brand || !showroom) {
      Alert.alert('Please fill in all fields.');
      return;
    }
  
    const { data, error } = await supabase.from('Vehicle').insert([
      {
        name,
        logo: path, // Use the URL here
        price,
        carType,
        carPass: passCapacity,
        personLogo: 'person-outline',
        topSpeed,
        carBrand: brand,
        show_room: showroom,
      },
    ]);
  
    if (error) {
      console.error('Insert Error:', error);
      Alert.alert('Error:', error.message);
    } else {
      Alert.alert('Vehicle Added Successfully');
      resetForm();
    }
  };
  

  const resetForm = () => {
    setName('');
    setPrice('');
    setBrand('');
    setTopSpeed('');
    setCarType('');
    setPassCapacity('');
    setShowroom('');
    setImageUri(null);
    setImagePath(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#0066ff', '#00cccc']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Add Your Desired Vehicle</Text>
          <View style={styles.card}>
            <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
            <TextInput style={styles.input} placeholder="Price" value={price} onChangeText={setPrice} keyboardType="numeric" />
            <Picker selectedValue={brand} style={styles.input} onValueChange={setBrand}>
              <Picker.Item label="Select a Brand" value="" />
              <Picker.Item label="Toyota" value="Toyota" />
              <Picker.Item label="Honda" value="Honda" />
            </Picker>
            <Picker selectedValue={topSpeed} style={styles.input} onValueChange={setTopSpeed}>
              <Picker.Item label="Select Top Speed" value="" />
              <Picker.Item label="180 KM/HR" value="180" />
              <Picker.Item label="200 KM/HR" value="200" />
            </Picker>
            <Picker selectedValue={carType} style={styles.input} onValueChange={setCarType}>
              <Picker.Item label="Choose Car Type" value="" />
              <Picker.Item label="Saloon" value="saloon" />
              <Picker.Item label="S.U.V" value="SUV" />
              <Picker.Item label="Hatchback" value="hatchback" />
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Passenger Capacity"
              value={passCapacity}
              onChangeText={setPassCapacity}
              keyboardType="numeric"
            />
            <Picker selectedValue={showroom} style={styles.input} onValueChange={setShowroom}>
              <Picker.Item label="Choose Showroom" value="" />
              <Picker.Item label="Lanchaster Motors Limited" value="lanchaster" />
              <Picker.Item label="Kai And Karo" value="kai_and_karo" />
            </Picker>
            <TouchableOpacity style={styles.imageButton} onPress={chooseImageFromGallery}>
              <Text style={styles.imageButtonText}>Choose Image</Text>
            </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={styles.previewImage} />}
            <TouchableOpacity style={styles.button} onPress={insertVehicle}>
              <Text style={styles.buttonText}>ADD VEHICLE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  gradient: { flex: 1 },
  scrollContent: { flexGrow: 1, padding: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 20 },
  input: { borderBottomWidth: 1, borderBottomColor: '#e0e0e0', padding: 10, marginBottom: 15 },
  button: { backgroundColor: 'black', borderRadius: 5, paddingVertical: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  imageButton: { backgroundColor: '#0066ff', padding: 10, borderRadius: 5, alignItems: 'center' },
  imageButtonText: { color: 'white', fontSize: 16 },
  previewImage: { width: '100%', height: 200, marginTop: 10, borderRadius: 10 },
});

