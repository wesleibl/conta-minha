import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Pressable} from "react-native";
import Checkbox from 'expo-checkbox';

export function BillsItem({ data }) {
  const [billIsChecked, setBillIsChecked] = React.useState(false)
  const { billName, expireDate, installments, amount, isChecked } = data;
  const formattedAmount = amount.toString().replace('.', ',') + (amount.toString().includes(',') ? '' : ',00');

  useEffect(() => {
    setBillIsChecked(isChecked);
  }, [isChecked]);

  return (
    <Pressable style={styles.container}>
      <Text style={[styles.text, {width: 100}]}>{billName}</Text>
      <Text style={styles.text}>{new Date(expireDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</Text>
      <Text style={[styles.text, {width: 15}]}>{installments}</Text>
      <Text style={[styles.text, {width: 90}]}>{formattedAmount}</Text>
      <Checkbox 
        style={styles.checkbox} 
        value={billIsChecked}
        onValueChange={() => setBillIsChecked((prev) => !prev)}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFCB47",
    width: "100%",
    marginBottom: 14,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: 'Poppins-Regular',
    width: 50,
    minHeight: 40,
    textAlign: "center",
    textAlignVertical: "center"
  },
  checkbox: {
    marginRight: 20
  }
});