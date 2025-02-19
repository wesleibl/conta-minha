import { View, Text, TextInput, Switch, StyleSheet, TouchableOpacity } from "react-native";
import { RadioButton } from "react-native-paper";
import React, { useState } from "react";

export function AdicionarConta() {
    const [step, setStep] = useState(1);
    const [opPayReceive, setOpPayReceive] = useState("pay");
    const [billName, setBillName] = useState("");
    const [installments, setInstallments] = useState(0);
    const [isInstallmentsEnabled, setIsInstallmentsEnabled] = useState(false);
    const [installmentsType, setInstallmentsType] = useState("installments");
    const [amount, setAmount] = useState("");

    const toggleSwitch = () => {
        setIsInstallmentsEnabled(!isInstallmentsEnabled);
        setInstallments(0);
        setInstallmentsType("installments");
    };

    const handleAmmount = (ammount) => {
        console.log(ammount)
        let formattedAmmount = ammount.replace(/[^0-9,]/g, "");
        
        if (formattedAmmount.indexOf(',') !== -1) {
            formattedAmmount = formattedAmmount.replace(/,(?=.*,)/g, "");
        }

        formattedAmmount = formattedAmmount.replace(/(\,\d{2})\d+/g, "$1");

        setAmount(formattedAmmount);
    }

    console.log(step)

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
                            style={styles.inputAmmount}
                            onChangeText={text => handleAmmount(text)}
                            value={amount}
                            placeholder="Digite o valor"
                            keyboardType="numeric"
                        />
                    </View>
                )}
                {step === 4 && (
                    <View>
                        <Text style={styles.titleStep}>Tem parcelas?</Text>
                        <View style={styles.opInstallmentsWrapper}>
                            <TouchableOpacity 
                            onPress={() => {setIsInstallmentsEnabled(false); setStep(step + 1)}}
                            style={styles.opInstallments}
                            >
                                <Text style={styles.opText}>Não</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={() => {setIsInstallmentsEnabled(true); setStep(step + 1)}}
                            style={styles.opInstallments}
                            >
                                <Text style={styles.opText}>Sim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {(step > 1) && (
                    <View style={styles.stepWrapper}>
                        <TouchableOpacity style={styles.stepButton} onPress={() => setStep(step - 1)}>
                            <Text style={styles.opText}>Voltar</Text>
                        </TouchableOpacity>
                        {(step === 2 || step === 3) && (
                        <TouchableOpacity style={[styles.stepButton, styles.nextStepButton]} onPress={() => setStep(step + 1)}>
                            <Text style={styles.opText}>Próximo</Text>
                        </TouchableOpacity>
                        )}
                    </View>
                )}
                {step === 5 && (
                    <View style={styles.stepWrapper}>
                        <TouchableOpacity style={[styles.stepButton, styles.nextStepButton]} onPress={() => setStep(step + 1)}>
                            <Text style={styles.opText}>Salvar</Text>
                        </TouchableOpacity>
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
        justifyContent: "center",
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
    inputAmmount: {
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
});
