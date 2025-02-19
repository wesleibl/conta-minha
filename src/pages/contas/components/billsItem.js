import React, { useState } from "react";
import { Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';

export function BillsItem({ data }) {
  const [isChecked, setChecked] = useState(false);

    return (
      <Pressable style={styles.container}>
        <Text style={styles.text}>{data.billName}</Text>
        <Text style={styles.text}>{new Date(data.expireDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</Text>
        <Text style={styles.text}>{data.installments}</Text>
        <Text style={styles.text}>{data.amount}</Text>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
      </Pressable>
    );
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0E0D0D",
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20
  },
  text: {
    color: "white",
    fontFamily: 'Poppins-Regular',
    width: 50
  },
});