import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import { useBillsStore } from "../../store/billsStore";
import { BillsList } from "../contas/components/billsList"
import { Ionicons } from "@expo/vector-icons";

export function Home() {
    const [listBillsPay, setListBillsPay] = useState([]);
    const [listBillsReceive, setListBillsReceive] = useState([]);
    const focused = useIsFocused();
    const store = useBillsStore();

    const getTotalAmount = (bills) => {
        return bills.reduce((acc, bill) => acc + parseFloat(bill.amount), 0);
    };

    const getStatusIcon = async () => {
        if (store.billsStatus.pastDueUnchecked) {
            return <Ionicons size={36} color={'#E94F37'} name="alert-circle" />;
        }

        if (store.billsStatus.allChecked) {
            return <Ionicons size={36} color={'#0DE794'} name="checkmark-circle" />;
        }

        return <Ionicons size={36} color={'#FFCB47'} name="time" />;
    };

    useEffect(() => {
        store.loadBills();
        store.checkBillsValidation();
        const billsPay = store.billsPay(store.bills);
        const billsReceive = store.billsReceive(store.bills);
        setListBillsPay(billsPay);
        setListBillsReceive(billsReceive);
    }, [focused]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas contas</Text>
                {getStatusIcon()}
            </View>
            <View style={styles.headerList}>
                <Text style={styles.headerListText}>Nome</Text>
                <Text style={styles.headerListText} numberOfLines={1} ellipsizeMode="tail">Vencimento</Text>
                <Text style={styles.headerListText}>Parcelas</Text>
                <Text style={styles.headerListText}>Valor</Text>
                <Text style={styles.headerListText}>Pago</Text>
            </View>
            <View style={styles.content}>
                <BillsList list={listBillsPay}/>
                <Text style={styles.opTitle}>Total Pagar R$: {getTotalAmount(listBillsPay)}</Text>
                <BillsList list={listBillsReceive}/>
                <Text style={styles.opTitle}>Total Receber R$: {getTotalAmount(listBillsReceive)}</Text>
            </View>
'           <View style={styles.footer}>
                <Text style={styles.footerText}>Total </Text>
                <Text style={styles.footerText}>
                    R$: {getTotalAmount(listBillsPay)}
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap:20,
        backgroundColor: "#0E0D0D",
        width: "100%",
    },
    header: {
        flexDirection: "row",
        paddingVertical: 28,
        paddingHorizontal: 14,
        justifyContent: "space-between"

    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        textAlignVertical: "center"
    },
    headerList: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    headerListText: {
        color: "white",
        fontFamily: 'Poppins-Regular',
        textAlign: "center",
        minWidth: 50
    },
    content: {
        flex: 1,
        marginHorizontal: 2
    },
    footer: {
        flexDirection: "row",
        padding: 20
    },
    footerText: {
        color: "white",
        fontFamily: 'Poppins-Regular',
        textAlign: "center",
        fontSize: 20
    },
    opTitle: {
        color: "white",
        fontFamily: 'Poppins-Regular',
        textAlign: "right",
        minWidth: 50,
        fontSize: 14,
        marginBottom: 10,
        paddingRight: 20
    }
})