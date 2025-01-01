import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
export type { InputTransactionProps };

interface InputTransactionProps {
    datetime: string;
    title: string;
    payer: string;
    attendees_ids: string[];
    price: number;
    issplited: boolean;
}

const NewTransactionInput = ({ onAddTransaction }: {
    onAddTransaction: (transaction: InputTransactionProps) => void;
}) => {
  const [datetime, setDatetime] = useState(new Date().toISOString());
  const [title, setTitle] = useState('');
  const [payer, setPayer] = useState('');
  const [attendees, setAttendees] = useState('');
  const [price, setPrice] = useState('');

  const handleAddTransaction = () => {
    const newTransaction = {
      datetime,
      title,
      payer,
      attendees_ids: attendees.split(',').map(id => id.trim()),
      price: parseFloat(price),
      issplited: false, // Default value, adjust as needed
    };
    onAddTransaction(newTransaction);
    clearInputs();
  };

  const clearInputs = () => {
    setDatetime(new Date().toISOString());
    setTitle('');
    setPayer('');
    setAttendees('');
    setPrice('');
  };

  return (
    <View style={[styles.inputContainer, {flexDirection: 'row'}]}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Payer"
        value={payer}
        onChangeText={setPayer}
        style={styles.input}
      />
      <TextInput
        placeholder="Attendees (comma separated IDs)"
        value={attendees}
        onChangeText={setAttendees}
        style={styles.input}
      />
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Add" onPress={handleAddTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default NewTransactionInput;