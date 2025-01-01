import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from "@react-navigation/native";
import { RootStackParamList, Transaction } from "@/constants/types";
import { useRouter } from "expo-router";

type Split = {
  from: string;
  to: string;
  amount: number;
};

const SplitBillPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      Name: "Lunch",
      timestamp: new Date().toISOString(),
      Payer: "Ryan",
      Debter: ["Neo"],
      Amount: 500,
    },
    {
      Name: "Dinner",
      timestamp: new Date().toISOString(),
      Payer: "Neo",
      Debter: ["Rong"],
      Amount: 300,
    },
  ]);
  const [splitResult, setSplitResult] = useState<Split[]>([]);
  const router = useRouter();
  const route = useRoute<RouteProp<RootStackParamList, "splitbill">>();

  // 當返回頁面時，檢查是否有新交易，並更新交易列表
  useEffect(() => {
    const newTransaction = route.params?.newTransaction;
    if (newTransaction) {
      setTransactions((prev) => [...prev, newTransaction]);
    }
  }, [route.params]);

  const handleSplit = () => {
    const result: Split[] = [];
    const balance: Record<string, number> = {};

    // Calculate balances
    transactions.forEach(({ Payer, Debter, Amount }) => {
      balance[Payer] = (balance[Payer] || 0) + Amount;
      const splitAmount = Amount / Debter.length;
      Debter.forEach((debter) => {
        balance[debter] = (balance[debter] || 0) - splitAmount;
      });
    });

    // Resolve balances
    const creditors = Object.entries(balance).filter(([_, bal]) => bal > 0);
    const debtors = Object.entries(balance).filter(([_, bal]) => bal < 0);

    while (debtors.length && creditors.length) {
      const [debtor, debt] = debtors[0];
      const [creditor, credit] = creditors[0];

      const settledAmount = Math.min(-debt, credit);
      result.push({ from: debtor, to: creditor, amount: settledAmount });

      balance[debtor] += settledAmount;
      balance[creditor] -= settledAmount;

      if (balance[debtor] === 0) debtors.shift();
      if (balance[creditor] === 0) creditors.shift();
    }

    setSplitResult(result);
    Alert.alert("Split Complete", "Balances have been resolved!");
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.Name}</Text>
      <Text style={styles.cell}>{item.Payer}</Text>
      <Text style={styles.cell}>{item.Debter.join(", ")}</Text>
      <Text style={styles.cell}>{item.Amount}</Text>
    </View>
  );

  const renderSplit = ({ item }: { item: Split }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.from}</Text>
      <Text style={styles.cell}>{item.to}</Text>
      <Text style={styles.cell}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Add Transaction Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.navigate("/(tabs)/splitbill/addbill")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Original Transactions */}
      <Text style={styles.header}>Transactions</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.headerCell}>Name</Text>
          <Text style={styles.headerCell}>Payer</Text>
          <Text style={styles.headerCell}>Debter</Text>
          <Text style={styles.headerCell}>Amount</Text>
        </View>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Split Button */}
      <TouchableOpacity style={styles.splitButton} onPress={handleSplit}>
        <Text style={styles.splitButtonText}>SPLIT</Text>
      </TouchableOpacity>

      {/* Split Result */}
      <Text style={styles.header}>Split Result</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.headerCell}>From</Text>
          <Text style={styles.headerCell}>To</Text>
          <Text style={styles.headerCell}>Amount</Text>
        </View>
        <FlatList
          data={splitResult}
          renderItem={renderSplit}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 25,
    alignSelf: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  table: {
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
  cell: {
    flex: 1,
    fontSize: 14,
  },
  splitButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  splitButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SplitBillPage;
