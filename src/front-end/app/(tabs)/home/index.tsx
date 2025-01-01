import React from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import EventCard from '@/components/app/EventCard';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function HomePage() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>GroupUp</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <MaterialIcons name="notifications-none" size={24} color="#f39c12" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="menu" size={24} color="#f39c12" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#7f8c8d" />
        <TextInput 
          placeholder="FindGroup" 
          style={styles.searchInput} 
          placeholderTextColor="#D0D0D0" 
        />
      </View>

      {/* Recent Notice */}
      <Text style={styles.sectionTitle}>Recent Notice</Text>
      <Link href={'/(tabs)/home/notiBoard'}>
        <View style={styles.eventCard}>
          <Text style={styles.eventType}>Event</Text>
          <View style={styles.eventContent}>
            <View>
              <Text style={styles.eventTitle}>EventName</Text>
              <Text style={styles.eventDetails}>Detail............................</Text>
              <Text style={styles.eventChannel}>Channel Name GroupName</Text>
            </View>
            <View style={styles.eventIcon} />
          </View>
        </View>
      </Link>

      {/* Create Group Section */}
      <TouchableOpacity style={styles.createGroup}>
        <Ionicons name="add-circle-outline" size={20} color="#e67e22" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.createText}>Create Group</Text>
          <Text style={styles.createSubText}>Gather your friends in a group chat.</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcons: { flexDirection: 'row', gap: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#f39c12' },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 40,
    marginBottom: 20,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#e67e22', marginVertical: 10 },

  eventCard: {
    backgroundColor: '#fffbf0',
    padding: 15,
    borderRadius: 10,
    borderColor: '#f39c12',
    borderWidth: 1,
    marginBottom: 20,
  },
  eventType: {
    color: '#e67e22',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: { fontSize: 16, fontWeight: 'bold', color: '#000' },
  eventDetails: { fontSize: 14, color: '#7f8c8d', marginVertical: 5 },
  eventChannel: { fontSize: 12, color: '#27ae60' },
  eventIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#dcdcdc',
    borderRadius: 20,
  },

  createGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e67e22',
    marginVertical: 20,
  },
  createText: { fontSize: 16, fontWeight: 'bold', color: '#e67e22' },
  createSubText: { fontSize: 12, color: '#7f8c8d' },
});
