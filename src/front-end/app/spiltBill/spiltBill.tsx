import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Stack, useRouter, Navigator, router, Link} from 'expo-router';

const Accounting = () => {
const frontendRouter = useRouter(); 
    

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="orange" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Accounting</Text>
      </View>

      {/* Group Name and Channel Name */}
      <Text style={styles.groupName}>GroupName-ChannelName</Text>

      {/* Income and Expense Summary */}
      <View style={styles.summaryContainer}>
        <TouchableOpacity style={styles.summaryBox}>
          <Text style={styles.expenseLabel}>Expence</Text>
          <Text style={styles.amount}>$5,000,000,000</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.summaryBox}>
          <Text style={styles.incomeLabel}>Income</Text>
          <Text style={styles.amount}>$5,000,000,000</Text>
        </TouchableOpacity>
      </View>

      {/* Balance */}
      {/* <View style={styles.balanceContainer}>
        <View style={styles.circle}>
          <Text style={styles.balanceLabel}>Balance</Text>
          <Text style={styles.balanceAmount}>-$5,000,000,000</Text>
        </View>
      </View> */}

      {/* Record List */}
      <ScrollView style={styles.recordContainer}>
        <Text style={styles.recordHeader}>Record</Text>
        <View style={styles.recordItem}>
          <Ionicons name="home" size={24} color="orange" style={styles.recordIcon} />
          <Text style={styles.recordText}>陶朱隱園點擊查看...</Text>
          <Text style={styles.recordAmount}>-$5,000,000,000</Text>
        </View>
        <View style={styles.recordItem}>
          <Ionicons name="home" size={24} color="orange" style={styles.recordIcon} />
          <Text style={styles.recordText}>陶朱隱園點擊查看...</Text>
          <Text style={styles.recordAmount}>-$5,000,000,000</Text>
        </View>
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton}>
      <Link href={'/spiltBill/add'}>Add</Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  groupName: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 14,
    color: '#888',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  summaryBox: {
    alignItems: 'center',
  },
  expenseLabel: {
    color: 'orange',
    fontSize: 16,
    fontWeight: 'bold',
  },
  incomeLabel: {
    color: 'orange',
    fontSize: 16,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  balanceContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FDEFD4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
  balanceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 8,
  },
  recordContainer: {
    backgroundColor: '#444',
    borderRadius: 8,
    marginHorizontal: 16,
    padding: 16,
    flex: 1,
  },
  recordHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
    marginBottom: 8,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#555',
  },
  recordIcon: {
    marginRight: 8,
  },
  recordText: {
    flex: 1,
    color: 'white',
  },
  recordAmount: {
    color: 'white',
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default Accounting;