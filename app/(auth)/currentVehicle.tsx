import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/DBconfig/supabaseClient';
import { AntDesign } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

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

const deleteVehicleData = async (id: number) => {
  const { data, error } = await supabase
    .from('Vehicle')
    .delete()
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

const CurrentVehicle = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Query for fetching vehicles
  const { data: vehicles, isLoading, error } = useQuery({
    queryKey: ['vehicles'],
    queryFn: fetchVehicleData,
  });

  // Mutation for deleting vehicles
  const deleteMutation = useMutation({
    mutationFn: deleteVehicleData,
    onSuccess: () => {
      // Invalidate and refetch vehicles query
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
      Alert.alert('Success', 'Vehicle deleted successfully');
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const handleDeleteVehicle = (item: Data) => {
    Alert.alert(
      'Delete Vehicle',
      `Are you sure you want to delete ${item.carBrand} ${item.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteMutation.mutate(item.id);
          },
        },
      ],
    );
  };

  const handleVehiclePress = (item: Data) => {
    router.push({
      pathname: `/(auth)/[id]`,
      params: {
        id: item.id,
        name: item.name,
        logo: item.logo,
        price: item.price.toString(),
        carType: item.carType,
        carPass: item.carPass.toString(),
        personLogo: item.personLogo,
        topSpeed: item.topSpeed,
        carBrand: item.carBrand,
        show_room: item.show_room,
      }
    });
  };

  const renderRating = (rating: number) => {
    return (
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, index) => (
          <AntDesign
            key={index}
            name={index < Math.floor(rating) ? "star" : "staro"}
            size={12}
            color="#FFD700"
          />
        ))}
        <Text style={styles.ratingText}>{rating}</Text>
      </View>
    );
  };

  // Debugging and error handling logs
  console.log('Fetched vehicles:', vehicles);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) {
    console.log("Error fetching data:", error.message);
    return <Text>Error: {error.message}</Text>;
  }

  if (vehicles?.length === 0) {
    return (
       <LottieView
              source={require('@/animations/notfound.json')}
              autoPlay
              loop
              style={{ width: "auto", height: '100%', marginVertical: 5 }}
            />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={vehicles}
        renderItem={({ item }) => (
          <View style={styles.vehicleCard}>
            <View style={styles.contentContainer}>
              <View style={styles.infoContainer}>
                <Text style={styles.vehicleName}>
                  {item.carBrand} {item.name}
                </Text>
                <Text style={styles.priceText}>
                  ${item.price.toFixed(2)} <Text style={styles.perDayText}>/Per Day</Text>
                </Text>
                {renderRating(4.5)}
              </View>
              <Image
                source={{ uri: item.logo }}
                style={styles.vehicleImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={() => handleVehiclePress(item)}
              >
                <Text style={styles.updateButtonText}>Update Vehicle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.updateButton, styles.deleteButton]}
                onPress={() => handleDeleteVehicle(item)}
                disabled={deleteMutation.isPending}
              >
                <Text style={styles.updateButtonText}>
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete Vehicle'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CurrentVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  vehicleCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoContainer: {
    flex: 1,
    paddingRight: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  perDayText: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'normal',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  updateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  deleteButton: {
    backgroundColor: 'red',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  vehicleImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
});
