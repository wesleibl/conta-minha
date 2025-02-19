import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native';
import { useState, useEffect } from 'react'
import useStorage from '@/src/hooks/useStorage';
import { BillsItem } from '../contas/components/billsItem';

export function Home() {
    const [listBills, setListBills] = useState([]);
    const focused = useIsFocused();
    const { getBill, removeBill } = useStorage();

    useEffect(() => {
        async function loadBills() {
            const bills = await getBill("@bill");
            
            setListBills(bills)
        }

        loadBills();
    }, [focused])

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas contas</Text>
                <Image source={require('@/src/assets/circle-skeleton.png')} style={{width: 36, height: 36}}/>
            </View>
            <FlatList
                data={listBills}
                keyExtractor={(item) => String(item)}
                renderItem={({item}) => <BillsItem data={item}/>}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        backgroundColor: "#2A7D9F",
        paddingVertical: 28,
        paddingHorizontal: 14,
        justifyContent: "space-between"

    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFF",
        textAlignVertical: "center"
    }
})