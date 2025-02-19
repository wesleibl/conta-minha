import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
    const saveBill = async (key, value) => {
        try{
            let bills = await getBill(key);

            bills.push(value);

            await AsyncStorage.setItem(key, JSON.stringify(bills));
        }catch(error) {
            console.log("Error ao salvar", error)
        }
    }

    const getBill = async (key) => {
        try {
            const passwords = await AsyncStorage.getItem(key);

            return JSON.parse(passwords) || [];
        }catch (error) {
            console.log("Erro ao buscar", error)
            return [];
        }
    }

    const removeBill = async (key, value) => {
        try {
            let bills = await getBill(key);

            let myBills = bills.filter ((bills) => {
                return (bills) !== value;
            })

            await AsyncStorage.setItem(key, JSON.stringify(myBills));
            return myBills;
        } catch (error) {
            console.log("Erro ao deletar", error)
        }
    }
    
    return {
        saveBill,
        getBill,
        removeBill
    }
}

export default useStorage;