import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { SvgUri } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function EnquiryScreen() {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [centre, setCentre] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#0066ff', '#00cccc']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Add Your Desired Vehicle</Text>
          
          <View style={styles.illustrationContainer}>
            <SvgUri
              width={width * 0.8}
              height={200}
              uri="https://your-illustration-url.svg"
            />
          </View>

          <View style={styles.card}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter Name</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={country}
                  onValueChange={(value) => setCountry(value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Country" value="" />
                  {/* Add country options here */}
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Select State</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={state}
                  onValueChange={(value) => setState(value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select State" value="" />
                  {/* Add state options here */}
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Select District</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={district}
                  onValueChange={(value) => setDistrict(value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select District" value="" />
                  {/* Add district options here */}
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Centre Name</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={centre}
                  onValueChange={(value) => setCentre(value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Centre" value="" />
                  {/* Add centre options here */}
                </Picker>
              </View>
            </View>

            <TouchableOpacity style={styles.button}>
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
    fontSize: 12,
    color: '#00cccc',
    marginBottom: 5,
  },
  pickerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  picker: {
    marginTop: -10,
    marginBottom: -10,
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