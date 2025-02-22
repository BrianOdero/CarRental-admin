import { View, Text, Image, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import supabase from '@/DBconfig/supabaseClient';

const fetchVehicleDetails = async (id: string) => {
  const { data, error } = await supabase
    .from('Vehicle')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export default function VehicleDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { data: vehicle, isLoading, error } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => fetchVehicleDetails(id as string),
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading vehicle details</Text>;
  if (!vehicle) return <Text>Vehicle not found</Text>;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.brandText}>{vehicle.carBrand.toUpperCase()}</Text>
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="star-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Car Name and Type */}
      <Text style={styles.carName}>{vehicle.name}</Text>
      <Text style={styles.carType}>{vehicle.carType}</Text>

      {/* Car Image */}
      <Image
        source={{ uri: vehicle.logo }}
        style={styles.carImage}
        resizeMode="contain"
      />

      {/* Performance Stats */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{vehicle.topSpeed}</Text>
          <Text style={styles.statLabel}>Top speed</Text>
        </View>
        <View style={[styles.statItem, styles.statBorder]}>
          <Text style={styles.statValue}>2.8 s</Text>
          <Text style={styles.statLabel}>0-100 km/h</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>761 HP</Text>
          <Text style={styles.statLabel}>Power</Text>
        </View>
      </View>

      {/* Car Info */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Car info</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Ionicons name="car-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{vehicle.carPass} Pass</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="speedometer-outline" size={20} color="#666" />
            <Text style={styles.infoText}>{vehicle.show_room}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="flash-outline" size={20} color="#666" />
            <Text style={styles.infoText}>Electric</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="cog-outline" size={20} color="#666" />
            <Text style={styles.infoText}>Automatic</Text>
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${vehicle.price}</Text>
          <Text style={styles.perDay}>/day</Text>
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book this car</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  brandText: {
    fontSize: 16,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 8,
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  carType: {
    fontSize: 16,
    color: '#666',
    paddingHorizontal: 16,
    marginTop: 4,
  },
  carImage: {
    width: '100%',
    height: 200,
    marginVertical: 24,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    margin: 16,
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#333',
  },
  statValue: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#999',
    fontSize: 12,
  },
  infoSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 8,
    color: '#666',
  },
  bottomSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#1a1a1a',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  perDay: {
    color: '#999',
    marginLeft: 4,
  },
  bookButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});