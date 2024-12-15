import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { SvgUri } from 'react-native-svg';
import supabase from '@/DBconfig/supabaseClient';

const { width } = Dimensions.get('window');

export default function EnquiryScreen() {

  // states for input variables
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [topSpeed, setTopSpeed] = useState('');
  const [carType, setCarType] = useState('');
  const [carModel, setCarModel] = useState('');
  const [passCapacity, setPassCapacity] = useState('');
  const [personLogo, setPersonLogo] = useState('person-outline');
  const [showroom, setShowroom] = useState('');


  //INSERT FUNCTION TO SUPABASE and REMAINING TO INSERT VEHICLE LOGO
  const insertVehicle = async () => {
    const {data,error} = await supabase
    .from('Vehicle')
    .insert([
      { 
        name: name, 
        price: price, 
        carBrand: brand, 
        topSpeed: topSpeed, 
        carType: carType, 
        carModel: carModel, 
        carPass: passCapacity, 
        personLogo: personLogo, 
        showroom: showroom 
      },
    ])
    .select()  

    if(error) Alert.alert(error.message)
    
      if(data){
        Alert.alert('Vehicle Added Successfully')
        setName('')
        setPrice('')
        setBrand('')
        setTopSpeed('')
        setCarType('')
        setCarModel('')
        setPassCapacity('')
        setPersonLogo('person-outline')
        setShowroom('')
      }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0066ff', '#00cccc']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Add Your Desired Vehicle</Text>
          
          <View style={styles.card}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter Name</Text>
              <View style={styles.pickerContainer}>
                <TextInput 
                  style={[styles.picker,{marginTop:5,paddingLeft: 10}]} 
                  placeholder="Enter Name"
                  value={name}
                  onChangeText={text => setName(text)}/>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Choose Vehicle Brand</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={brand}
                  onValueChange={(value) => setBrand(value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Toyota" value="Toyota" />
                  <Picker.Item label="Honda" value="Honda" />
                  <Picker.Item label="Mitsubishi" value="Mitsubishi" />
                  <Picker.Item label="Peugeot" value="Peugeot" />
                  {/* Add state options here */}
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Choose Top Speed</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={topSpeed}
                  onValueChange={(value) => setTopSpeed(value)}
                  style={styles.picker}
                >
                  <Picker.Item label="180 KM / HR" value="180" />
                  <Picker.Item label="200 KM / HR" value="200" />
                  <Picker.Item label="220 KM / HR" value="220" />
                 
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Set Vehicle Type</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={carType}
                  onValueChange={(value) => setCarType(value)}
                  style={styles.picker}
                >
                  <Picker.Item label="HatchBack" value="Hatchback" />
                  <Picker.Item label="Saloon" value="Saloon" />
                  <Picker.Item label="SUV" value="SUV" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Set Vehicle Passenger Capacity</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={passCapacity}
                  onValueChange={(value) => setPassCapacity(value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Four Passengers" value="4" />
                  <Picker.Item label="Five Passengers" value="5" />
                  <Picker.Item label="Seven Passengers" value="7" />
                </Picker>
              </View>
            </View>

             <View style={styles.inputContainer}>
              <Text style={styles.label}>Set Preferred Showroom</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={showroom}
                  onValueChange={(value) => setShowroom(value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Kai and Karo" value="Kai and Karo" />
                  <Picker.Item label="Lanchaster Motors" value="Lanchaster Car Shop" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Set Price</Text>
              <View style={styles.pickerContainer}>
                <TextInput 
                  style={[styles.picker,{paddingLeft: 16}]} 
                  placeholder="Set Desired Price"
                  value={price}
                  onChangeText={text => setPrice(text)}
                  />
              </View>
            </View>

            

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
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    marginBottom: 20,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#00cccc',
    marginBottom: 5,
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  picker: {
    marginTop: -10,
  
  },
  button: {
    backgroundColor: '#0066ff',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  linkText: {
    color: '#0066ff',
    fontSize: 14,
  },
});