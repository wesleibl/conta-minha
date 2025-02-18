import { View, Text, StyleSheet, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native';

export function Home() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas contas</Text>
                <Image source={require('@/src/assets/circle-skeleton.png')} style={{width: 36, height: 36}}/>
            </View>
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