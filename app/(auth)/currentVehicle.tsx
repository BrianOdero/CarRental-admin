import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import supabase from '@/DBconfig/supabaseClient';

type Data = {
  id: number;
  name: string;
  logo: string;
  price: number;
  carType: string;
  carPass: number;
  personLogo: string;
  topSpeed: string;
  carBrand: string;
  show_room: string;
};

const fetchVehicleData = async () => {
  const { data, error } = await supabase.from('Vehicle').select('*');
  if (error) throw new Error(error.message);
  return data;
};

const CurrentVehicle = () => {
  const router = useRouter();

  const { data: vehicle, isLoading, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicleData,
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      <FlatList
        data={vehicle}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={styles.vehicleCard}>
              <Image source={{ uri: item.logo }} alt={item.name} style={styles.vehicleImage} resizeMode="contain" />
              <View style={styles.vehiclePricingView}>
                <Text style={styles.vehicleName}>{item.carBrand} {item.name}</Text>
                <Text style={{ color: 'green', textAlign: 'right', margin: 10, marginHorizontal: 20 }}>
                  Ksh {item.price} / day
                </Text>
              </View>
              <View style={styles.vehicleData}>
                <View style={{ display: 'flex', flexDirection: 'row', flex: 1, margin: 5, justifyContent: 'space-evenly' }}>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Ionicons name={item.personLogo as any} size={20} color="black" style={{ marginRight: 10 }} />
                    <Text>{item.carPass} Pass</Text>
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Ionicons name={'home-outline'} size={20} color="black" style={{ marginRight: 10 }} />
                    <Text>{item.show_room}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CurrentVehicle;

const styles = StyleSheet.create({
  vehicleCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
    padding: 10,
    borderRadius: 20,
  },
  vehicleName: {
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'serif',
    fontWeight: 'bold',
    margin: 10,
    marginHorizontal: 15,
  },
  vehicleImage: {
    height: 150,
    width: 'auto',
    margin: 15
  },
  vehiclePricingView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  vehicleData: {
    display: 'flex',
    flexDirection: 'row',
  },
});
