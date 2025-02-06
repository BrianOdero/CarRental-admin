import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/DBconfig/supabaseClient';

interface LogDetails {
  user_email: string;
  created_at: string;
  id: number;
}

const fetchLogs = async (): Promise<LogDetails[]> => {
  const { data, error } = await supabase.from('loginLogs').select('*').order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
};

export default function SystemLogs() {
  const queryClient = useQueryClient();
  const { data: logs, isLoading, error } = useQuery({
     queryKey: ['loginLogs'],
     queryFn: fetchLogs });

  const deleteAllLogs = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('loginLogs').delete().neq('id', 0);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['loginLogs'] as any);
      Alert.alert('Success', 'All logs deleted successfully');
    },
    onError: () => {
      Alert.alert('Error', 'Failed to delete logs');
    },
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerText}>User Email</Text>
        <Text style={styles.headerText}>Time Logged In</Text>
      </View>
      <FlatList
        data={logs}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.name}>{item.user_email}</Text>
            <Text style={styles.amount}>{new Date(item.created_at).toLocaleString()}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No logs available</Text>}
      />
      {logs?.length as any > 0 && (
        <TouchableOpacity style={styles.trashButton} onPress={() => deleteAllLogs.mutate()}>
          <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 50,
    marginVertical: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'darkblue',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  trashButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#EF4444',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#6B7280',
  },
});
