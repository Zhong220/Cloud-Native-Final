import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Colors from "@/constants/Colors";
import { RootStackParamList, Transaction } from "@/constants/types";
import { useRouter } from "expo-router";

const AddBill = () => {
  const [name, setName] = useState("");
  const [payer, setPayer] = useState("");
  const [debters, setDebters] = useState("");
  const [amount, setAmount] = useState("");
  const router = useRouter();

  const handleAdd = () => {
    // 驗證輸入
    if (!name || !payer || !debters || isNaN(Number(amount))) {
      Alert.alert("錯誤", "請填寫所有欄位並輸入有效金額");
      return;
    }

    // 建立新的 transaction
    const newTransaction = {
      Name: name,
      timestamp: new Date().toISOString(), // 產生 ISO 格式的時間戳
      Payer: payer,
      Debter: debters.split(",").map((debter) => debter.trim()), // 分割並整理欠款人
      Amount: Number(amount),
    };

    // 回傳新數據給上一頁 (SplitBill)
    router.push("/(tabs)/splitbill");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>新增一筆交易</Text>
      <TextInput
        placeholder="交易名稱"
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholderTextColor={Colors.light.tabIconDefault}
      />
      <TextInput
        placeholder="付款人（Payer）"
        value={payer}
        onChangeText={setPayer}
        style={styles.input}
        placeholderTextColor={Colors.light.tabIconDefault}
      />
      <TextInput
        placeholder="欠款人（Debters，以逗號分隔）"
        value={debters}
        onChangeText={setDebters}
        style={styles.input}
        placeholderTextColor={Colors.light.tabIconDefault}
      />
      <TextInput
        placeholder="金額（Amount）"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
        placeholderTextColor={Colors.light.tabIconDefault}
      />
      <View style={styles.buttonGroup}>
        <Button title="新增" onPress={handleAdd} color={Colors.light.tint} />
        <Button
          title="取消"
          onPress={() => router.push("/(tabs)/splitbill")}
          color={Colors.light.tabIconDefault}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: Colors.light.text,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.light.tabIconDefault,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: Colors.light.background,
    color: Colors.light.text,
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "100%",
  },
});

export default AddBill;
