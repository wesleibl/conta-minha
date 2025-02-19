import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, Animated  } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import useStorage from "@/src/hooks/useStorage"
import DateTimePicker from "@react-native-community/datetimepicker";

export function AdicionarConta() {
    const [step, setStep] = useState(1);
    const [opPayReceive, setOpPayReceive] = useState("pay");
    const [billName, setBillName] = useState("");
    const [installments, setInstallments] = useState(0);
    const [isInstallmentsEnabled, setIsInstallmentsEnabled] = useState(false);
    const [installmentsType, setInstallmentsType] = useState("fixed");
    const [amount, setAmount] = useState("");
    const [expireDate, setExpireDate] = useState(new Date());
    const [show, setShow] = useState(false);
    
    const { saveBill } = useStorage();

    const isNextButtonEnabled = () => {
        if (step === 2 && billName.trim() === "") return false;
        if (step === 3 && amount.trim() === "") return false;
        if (step === 4 && !expireDate) return false;
        if (step === 7 && (installments <= 0 || isNaN(installments))) return false;
        return true;
    };

    const cleanInput = () => {
        setStep(1);
        setOpPayReceive("pay");
        setBillName("");
        setInstallments(0);
        setIsInstallmentsEnabled(false);
        setInstallmentsType("fixed");
        setAmount("");
        setExpireDate(new Date());
    };

    const handleAmount = (amount) => {
        let formattedAmount = amount.replace(/[^0-9,]/g, "");
        
        if (formattedAmount.indexOf(',') !== -1) {
            formattedAmount = formattedAmount.replace(/,(?=.*,)/g, "");
        }

        formattedAmount = formattedAmount.replace(/(\,\d{2})\d+/g, "$1");

        setAmount(formattedAmount);
    }

    const onChangeDate = (event, selectedDate) => {
        if (selectedDate) {
            setExpireDate(selectedDate);
        }
        setShow(false);
    };

    const handlePreviousStep = () => {
        setStep(step - 1)

        if(step === 7 || step === 8){
            setStep(5)
        }
    }

    const fetchBill = async () => {
        const bill = {
            optionBill: opPayReceive,
            billName: billName,
            amount: amount,
            expireDate: expireDate,
            installments: installments,
            installmentsType: installmentsType,
        };

        
        await saveBill('@bill', bill)
        alert("Conta salva com sucesso!")
        cleanInput();
        step = 1;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Siga os passos para adicionar sua conta 🚀</Text>
            <View style={styles.content}>
                {step === 1 && (
                    <View>
                        <Text style={styles.titleStep}>Escolha o tipo de transação:</Text>
                        <View style={styles.opPayReceiveWrapper}>
                            <TouchableOpacity 
                                onPress={() => {setOpPayReceive("pay"); setStep(step + 1)}}
                                style={styles.opPayReceiveButton}
                            >
                                <Text style={styles.opText}>Pagar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.opPayReceiveButton}
                                onPress={() => {setOpPayReceive("receive"); setStep(step + 1)}}
                            >
                                <Text style={styles.opText}>Receber</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {step === 2 && (
                    <View>
                        <Text style={styles.titleStep}>{opPayReceive === "pay" ? "Quem você precisa pagar?" : "Quem vai te pagar?"}</Text>
                        <TextInput
                            style={styles.inputName}
                            onChangeText={setBillName}
                            value={billName}
                            placeholder="Nome da pessoa/empresa"
                        />
                    </View>
                )}
                {step === 3 && (
                    <View>
                        <Text style={styles.titleStep}>Qual valor R$?</Text>
                        <TextInput
                            style={styles.inputAmount}
                            onChangeText={text => handleAmount(text)}
                            value={amount}
                            placeholder="Digite o valor"
                            keyboardType="numeric"
                        />
                    </View>
                )}
                {step === 4 && (
                    <View>
                        <Text style={[styles.titleStep, {width:300, textAlign: "left"}]}>Qual a data de vencimento?</Text>
                        <TouchableOpacity 
                            onPress={() => setShow(true)}
                            style={[styles.opInstallments, {alignSelf:"center"}]}
                            >
                                <Text style={[styles.opText, {width: 200, alignSelf: "center"} ]}>Abrir calendário</Text>
                        </TouchableOpacity>
                        {show && (
                        <DateTimePicker
                            value={expireDate}
                            mode="date"
                            display={Platform.OS === "ios" ? "spinner" : "calendar"}
                            onChange={() => {onChangeDate}}
                        />
                        )}
                    </View>
                )}
                {step === 5 && (
                    <View>
                        <Text style={styles.titleStep}>Essa conta será paga em uma única vez ou em parcelas?</Text>
                        <View style={styles.opInstallmentsWrapper}>
                            <TouchableOpacity 
                            onPress={() => {setIsInstallmentsEnabled(false); setStep(step + 3)}}
                            style={styles.opInstallments}
                            >
                                <Text style={styles.opText}>Única</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={() => {setIsInstallmentsEnabled(true); setStep(step + 1)}}
                            style={styles.opInstallments}
                            >
                                <Text style={styles.opText}>Parcelas</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {step === 6 && (
                    <View>
                        <Text style={styles.titleStep}>O tipo da parcela será recorrente ou com uma quantidade fixa de vezes?</Text>
                        <View style={styles.opInstallmentsWrapper}>
                            <TouchableOpacity 
                            onPress={() => {setInstallmentsType('recurrence'); setStep(step + 2)}}
                            style={styles.opInstallments}
                            >
                                <Text style={[styles.opText, {width: 90, alignSelf: "center"}]}>Recorrente</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={() => {setInstallmentsType('fixed'); setStep(step + 1)}}
                            style={styles.opInstallments}
                            >
                                <Text style={styles.opText}>Fixa</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {step === 7 && (
                    <View>
                        <Text style={styles.titleStep}>Quantidade de parcelas:</Text>
                        <TextInput
                            style={styles.inputAmount}
                            onChangeText={setInstallments}
                            value={installments}
                            placeholder="12"
                        />
                    </View>
                )}            
                {(step === 8) && (
                    <View>
                        <View style={styles.saveType}>
                            <Text style={styles.choiceTitle}>Tipo de conta: </Text>
                            <Text style={styles.choice}>{opPayReceive === 'pay' ? 'Pagar' : 'Receber'}</Text>
                        </View>
                        <View style={styles.saveType}>
                            <Text style={styles.choiceTitle}>Nome da pessoa/empresa: </Text>
                            <Text style={styles.choice}>{billName}</Text>
                        </View>
                        <View style={styles.saveType}>
                            <Text style={styles.choiceTitle}>Valor R$:</Text>
                            <Text style={styles.choice}>{amount}</Text>
                        </View>
                        <View style={styles.saveType}>
                            <Text style={styles.choiceTitle}>Data de vencimento:</Text>
                            <Text style={styles.choice}>{expireDate.toLocaleDateString('pt-BR')}</Text>
                        </View>
                        <View style={styles.saveType}>
                            <Text style={styles.choiceTitle}>Tem parcelas?</Text>
                            <Text style={styles.choice}>{isInstallmentsEnabled ? 'Sim' : 'Não'}</Text>
                        </View>
                        {isInstallmentsEnabled && (
                            <View style={styles.saveType}>
                                <Text style={styles.choiceTitle}>Tipo: </Text>
                                <Text style={styles.choice}>{installmentsType === 'recurrence' ? 'Recorrência' : 'Fixa'}</Text>
                            </View>
                        )}
                        {(installmentsType === 'fixed') && (
                            <View style={styles.saveType}>
                                <Text style={styles.choiceTitle}>Quantidade de parcelas:</Text>
                                <Text style={styles.choice}>{installments}</Text>
                            </View>
                        )}
                    </View>
                )}
            </View>
            <View>
                {(step > 1) && (
                    <View style={styles.stepWrapper}>
                        <TouchableOpacity style={[styles.stepButton, styles.previuosButton]} onPress={() => handlePreviousStep()}>
                            <Ionicons name="arrow-back-outline" size={24} style={{alignSelf: "center"}}/>
                        </TouchableOpacity>
                        {(step === 2 || step === 3 || step === 4 || step === 7) && (
                            <TouchableOpacity
                                style={[styles.stepButton, styles.nextStepButton, {opacity: isNextButtonEnabled() ? 1 : 0.3}]}
                                onPress={() => setStep(step + 1)}
                                disabled={!isNextButtonEnabled()}
                            >
                                <Text style={styles.opText}>Próximo</Text>
                            </TouchableOpacity>
                        )}
                        {step === 8 && (
                            <TouchableOpacity
                                style={[styles.stepButton, styles.nextStepButton, {opacity: isNextButtonEnabled() ? 1 : 0.3}]}
                                onPress={() => fetchBill()}
                            >
                                <Text style={styles.opText}>Salvar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 40,
        justifyContent: "space-between",
        backgroundColor: "#0E0D0D",
        width: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#F6F6F6",
        fontFamily: 'Poppins-Regular',
        marginBottom: 60,
        paddingHorizontal: 30
    },
    content: {
        alignItems: "center",
        gap: 20,
    },
    titleStep: {
        color: "white",
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        marginVertical: 20,
    },
    opPayReceiveWrapper: {
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center"
    }
    ,
    opPayReceiveButton: {
        backgroundColor: "#FFCB47",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 20,
        width: 150
    },
    opText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        textAlign: "center",
    },
    stepWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 300
    },
    stepButton: {
        backgroundColor: "#E94F37",
        paddingVertical: 10,
        borderRadius: 20,
        width: 100,
        marginTop: 30,
    },
    previuosButton: {
        width: 50,
        borderRadius: 100
    },
    nextStepButton: {
      backgroundColor: "#0DE794"  
    },
    inputName: {
        backgroundColor: "#FFCB47",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 20,
        width: 300,
        textAlign: "center",
        alignSelf: "center",
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    },
    inputAmount: {
        backgroundColor: "#FFCB47",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 20,
        width: 300,
        textAlign: "center",
        alignSelf: "center",
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    },
    opInstallmentsWrapper: {
        flexDirection: "row",
        gap: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    opInstallments: {
        backgroundColor: "#FFCB47",
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 20,
        width: 150
    },
    saveType: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        width: 300,
        height: 50,
    },
    choice: {
        backgroundColor: "#FFCB47",
        paddingHorizontal: 10,
        borderRadius: 20,
        alignSelf: "center",
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
    },
    choiceTitle: {
        color: "white",
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        textAlignVertical: "center"
    }
});
