import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface CarListItemProps {
  name: string;
  image: string;
  rating: string;
  passengers: number;
  pricePerDay: number;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
}

export const CarListItem = ({
  name,
  image,
  rating,
  passengers,
  pricePerDay,
 
}: CarListItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{name}</Text>
      </View>
      
      <Image 
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />
      
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{rating}</Text>
        </View>
        
        <View style={styles.detailItem}>
          <Text style={styles.detailValue}>{passengers}</Text>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${pricePerDay}</Text>
          <Text style={styles.priceUnit}>/day</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  image: {
    width: '100%',
    height: 150,
    marginVertical: 12,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  priceUnit: {
    fontSize: 14,
    color: '#666',
    marginLeft: 2,
  },
});

// Usage example:
// <CarListItem
//   name="Porsche Taycan"
//   image="https://example.com/porsche-taycan.png"
//   rating="10.9"
//   passengers={4}
//   pricePerDay={120}
//   isFavorite={false}
//   onFavoritePress={() => {}}
// />