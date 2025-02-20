import AsyncStorage from "@react-native-async-storage/async-storage";

const createInstallments = (billData) => {
    const { installments, amount, billName, expireDate } = billData;
    const startDate = new Date(expireDate);
    const billsToAdd = [];

    if (installments && installments > 1) {
        for (let i = 0; i < installments; i++) {
            const newBill = {
                billName,
                amount,
                expireDate: new Date(startDate.setMonth(startDate.getMonth() + 1)).toISOString().split('T')[0], // Formata a data no padrão americano
                installments: installments - i,
                paymentRegister: false,
            };

            billsToAdd.push(newBill);
        }
    } else {
        billsToAdd.push({
            billName,
            amount,
            expireDate: new Date(expireDate).toISOString().split('T')[0], // Formata a data no padrão americano
            installments: 1,
            paymentRegister: false,
        });
    }

    return billsToAdd;
};

const useStorage = () => {
    const saveBill = async (key, value) => {
        try {
            let bills = await getBill(key);

            const billsToSave = createInstallments(value);

            bills.push(...billsToSave);

            await AsyncStorage.setItem(key, JSON.stringify(bills));
        } catch (error) {
            console.log("Error ao salvar", error);
        }
    };

    const payBill = async (key, data) => {
        try {
            let bills = await getBill(key);

            const updatedBills = bills.map(bill => {
                if (bill.id === data.id) {
                    return { ...bill, paymentRegister: !bill.paymentRegister };
                }
                return bill;
            });
            
            await AsyncStorage.setItem(key, JSON.stringify(updatedBills));
        } catch (error) {
            console.log("Erro ao atualizar status de pagamento", error);
        }
    };

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

            await AsyncStorage.setItem(key, JSON.stringify(zero));
            return myBills;
        } catch (error) {
            console.log("Erro ao deletar", error)
        }
    }

    const clearAllBills = async () => {
        try {
            await AsyncStorage.clear();
            console.log("Todos os dados foram apagados com sucesso");
        } catch (error) {
            console.log("Erro ao limpar dados", error);
        }
    };

    const getBillsThisMonth = async (key) => {
        try {
            const bills = await getBill(key);

            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();

            const billsThisMonth = bills.filter((bill) => {
                if (!bill.expireDate) return false;
    
                const billDate = new Date(bill.expireDate);
                return billDate.getMonth() === currentMonth && billDate.getFullYear() === currentYear;
            });

            return billsThisMonth;
        } catch (error) {
            console.log("Erro ao buscar contas deste mês", error);
            return [];
        }
    };

    const getRemainingAmount = async (key) => {
        try {
            const billsThisMonth = await getBillsThisMonth(key);
            const totalAmount = billsThisMonth.reduce((acc, bill) => {
                const value = parseFloat(bill.amount);
    
                return !Number.isNaN(value) ? acc + value : acc;
            }, 0);

            const paidAmount = billsThisMonth.reduce((acc, { paymentRegister, amount }) => {
                const value = parseFloat(amount.replace(',', '.'));
                return paymentRegister && !Number.isNaN(value) ? acc + value : acc;
            }, 0);

            const remainingAmount = totalAmount - paidAmount;

            return Number.isNaN(remainingAmount) ? 0 : remainingAmount;
        } catch (error) {
            console.error("Erro ao calcular saldo restante:", error);
            return 0;
        }
    };

    return {
        saveBill,
        getBill,
        removeBill,
        payBill,
        getBillsThisMonth,
        clearAllBills,
        getRemainingAmount,
        payBill
    }
}

export default useStorage;