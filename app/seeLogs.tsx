import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OrderHistoryItemProps {
  name: string;
  amount: number;
}

function OrderHistoryItem({ name, amount }: OrderHistoryItemProps) {
  const formattedAmount = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 2,
  }).format(amount);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftContent}>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.amount}>{formattedAmount}</Text>
    </View>
  );
}

const orderData = [
  { id: '1', name: 'John Kamau',  amount: 35432.50 },
  { id: '2', name: 'Aisha Wanjiru', amount: 12500.75 },
  { id: '3', name: 'David Ochieng',  amount: 8750.25 },
  { id: '4', name: 'Grace Muthoni',  amount: 22100.00 },
  { id: '5', name: 'Peter Njoroge',  amount: 5600.50 },
];

export default function systemLogs() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={orderData}
        renderItem={({ item }) => (
          <OrderHistoryItem
            name={item.name}
            amount={item.amount}
          />
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.trashButton} onPress={() => {}}>
        <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  leftContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981', // Green color
  },
  trashButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#EF4444', // Red color
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});