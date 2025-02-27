import React, { useEffect, useState } from "react";
import { Text, StyleSheet, Pressable} from "react-native";
import Checkbox from 'expo-checkbox';
import { useBillsStore } from "../../../store/billsStore";

export function BillsItem({ data }) {
  const { billName, expireDate, installments, amount, isChecked } = data;
  const formattedAmount = amount.toString().replace('.', ',') + (amount.toString().includes(',') ? '' : ',00');
  const store = useBillsStore();

  const handleCheck = async () => {
    console.log('bills name', billName);
    await store.checkRegister(data.id);
    await store.loadBills();
    console.log("isChecked atualizado:", store.bills.find(bill => bill.id === data.id)?.isChecked);
  };

  return (
    <Pressable style={styles.container}>
      <Text style={[styles.text, {width: 100}]}>{billName}</Text>
      <Text style={styles.text}>{new Date(expireDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</Text>
      <Text style={[styles.text, {width: 30}]}>{installments}</Text>
      <Text style={[styles.text, {width: 90}]}>R$: {formattedAmount}</Text>
      <Checkbox
        style={styles.checkbox} 
        value={isChecked}
        checked={isChecked}
        onPress={handleCheck}
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
    textAlign: "center",
    textAlignVertical: "center",
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  checkbox: {
    marginRight: 20
  }
});