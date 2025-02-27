import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';
import AsyncStorage from "@react-native-async-storage/async-storage";


export const useBillsStore = create((set) => ({
    bills: [],
    loadBills: async () => {
        const bills = await getStorageBills();
        set({ bills });
    },
    addBills: async (bill) => {
        const newBill = { id: uuidv4(), isChecked: false, ...bill };
        set((state) => ({ bills: [...state.bills, newBill] }));
        await saveStorageBills(newBill);
    },
    removeBills: async (id) => {
        set((state) => ({ bills: state.bills.filter((bill) => bill.id !== id) }));
        await removeStorageBill(id);
    },
    billsByMonth: (list) => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
    
        return list.filter((bill) => {
            const billDate = new Date(bill.expireDate);
            return (billDate.getMonth() === currentMonth) && (billDate.getFullYear() === currentYear);
        });
    },
    billsPay: (list) => {
        return list.filter((bill) => bill.optionBill === "pay");
    },
    billsReceive: (list) => {
        return list.filter((bill) => bill.optionBill === "receive");
    },
    checkRegister: async (id) => {
        const bills = await getStorageBills();
        const updatedBills = bills.map((bill) =>
            bill.id === id ? { ...bill, isChecked: !bill.isChecked } : bill
        );
        await saveStorageBills(updatedBills);
    }
}));

export const billsByMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return bills.filter((bill) => {
        const billDate = new Date(bill.expireDate);
        return (billDate.getMonth() === currentMonth) && (billDate.getFullYear() === currentYear);
    });
}

const saveStorageBills = async (bill) => {
    try {
        const currentBills = await getStorageBills();
        currentBills.push(bill);
        await AsyncStorage.setItem('@bills', JSON.stringify(currentBills));
    } catch (error) {
        console.log("Error ao salvar", error);
    }
};

const getStorageBills = async () => {
    try {
        const bills = await AsyncStorage.getItem('@bills');
        return JSON.parse(bills) || [];
    }catch (error) {
        console.log("Erro ao buscar", error)
        return [];
    }
}

const removeStorageBill = async (id) => {
    try {
        const currentBills = await getStorageBills();
        const updatedBills =  currentBills.filter((bill) => bill.id !== id);
        await AsyncStorage.setItem('@bills', JSON.stringify(updatedBills));
    } catch (error) {
        console.log("Error ao remover", error);
    }
}

const clearStorage = async () => {
    try {
        await AsyncStorage.setItem('@bills', JSON.stringify(''));
    }catch (error) {
        console.log("Erro ao limpar storage", error)
    }
}