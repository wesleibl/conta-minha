import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import useStorage from '@/src/hooks/useStorage';
import { BillsItem } from '../contas/components/billsItem';

export function Home() {
    const [listBills, setListBills] = useState([]);
    const focused = useIsFocused();
    const { getBill, removeBill, getBillsThisMonth, clearAllBills, getRemainingAmount, payBill } = useStorage();

    const getTotalAmount = (bills) => {
        return bills.reduce((acc, bill) => acc + parseFloat(bill.amount), 0);
    };

    const toggleChecked = (id) => {
        const updatedBills = listBills.map(bill => {
            if (bill.id === id) {
                const updatedBill = { 
                    ...bill, 
                    isChecked: !bill.isChecked 
                };
                payBill('@bill', updatedBill);
                return updatedBill;
            }
            return bill;
        });
        setListBills(updatedBills);
    };

    useEffect(() => {
        async function loadBills() {
            const bills = await getBillsThisMonth("@bill");
            const billsWithChecked = bills.map(bill => ({
                ...bill,
                isChecked: bill.paymentRegister
            }));
            setListBills(billsWithChecked);
        }

        loadBills();
    }, [focused]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas contas</Text>
                <Image source={require('@/src/assets/circle-skeleton.png')} style={{width: 36, height: 36}}/>
            </View>
            <View style={styles.headerList}>
                <Text style={styles.headerListText}>Nome</Text>
                <Text style={styles.headerListText} numberOfLines={1} ellipsizeMode="tail">Vencimento</Text>
                <Text style={styles.headerListText}>Parcelas</Text>
                <Text style={styles.headerListText}>Valor R$</Text>
                <Text style={styles.headerListText}>Pago</Text>
            </View>
            <FlatList
                style={styles.list}
                data={listBills}
                renderItem={({item}) => 
                    <BillsItem data={item} toggleChecked={toggleChecked} />
                }
            />
'           <View style={styles.footer}>
                <Text style={styles.footerText}>Total: </Text>
                <Text style={styles.footerText}>
                    {getTotalAmount(listBills)}
                </Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
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
    footer: {
        flexDirection: "row",
        padding: 20
    },
    footerText: {
        color: "white",
        fontFamily: 'Poppins-Regular',
        textAlign: "center",
        fontSize: 20
    }

})