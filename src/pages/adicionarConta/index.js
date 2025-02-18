import {View, Text, TextInput, Switch, StyleSheet, TouchableOpacity, TouchableWithoutFeedback}  from "react-native";
import { RadioButton } from "react-native-paper";
import React, {useState} from "react";

export function AdicionarConta() {
    const [opPayReceive, setOpPayReceive] =  React.useState('pay');
    const [billName, setBillName] = React.useState('');
    const [installments, setInstallments] = React.useState(0);
    const [isInstallmentsEnabled, setIsInstallmentsEnabled] = useState(false);
    const [installmentsType, setInstallmentsType] = useState('installments');

    const toggleSwitch = () => {
        setIsInstallmentsEnabled(previousState => !previousState)
        setInstallments(0);
        setInstallmentsType('installments');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Adicionar Conta</Text>
            <View style={styles.content}>
                <View style={styles.opPayReceive}>
                    <TouchableOpacity 
                        style={[
                            styles.button,
                            opPayReceive === "pay" && styles.activeButton
                        ]} 
                        onPress={() => setOpPayReceive("pay")}
                    >
                        <Text style={styles.buttonText}>Pagar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[
                            styles.button,
                            opPayReceive === "receive" && styles.activeButton
                        ]} 
                        onPress={() => setOpPayReceive("receive")}
                    >
                        <Text style={styles.buttonText}>Receber</Text>
                    </TouchableOpacity>
                </View> 
                <View>
                    {opPayReceive === "pay" 
                        ? (<Text>Quem você precisa pagar?</Text>) 
                        : (<Text>Quem vai te pagar?</Text>)
                    }
                    <TextInput
                        style={styles.billName}
                        onChangeText={text => setBillName(text)}
                        value={billName}
                        placeholder="Nome da pessoa/empresa"
                    />
                </View>
                <View style={styles.opInstallment}>
                    <Text style={styles.opInstallmentsTitle}>
                        Tem Parcelas?
                    </Text>
                    <Switch
                        trackColor={{false: '#767577', true: '#81b0ff'}}
                        thumbColor={isInstallmentsEnabled ? '#006E90' : '#f4f3f4'}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isInstallmentsEnabled}
                    />
                </View>
                {isInstallmentsEnabled && (
                    <View>
                        <View style={styles.radioGroup}>
                            <View style={styles.radioOp}>
                                <RadioButton
                                    color="#006E90"
                                    value="installments"
                                    status={installmentsType === 'installments' ? 'checked' : 'unchecked'}
                                    onPress={() => setInstallmentsType('installments')}
                                />
                                <Text>Parcelado</Text>
                            </View>
                            <View style={styles.radioOp}>
                                <RadioButton
                                    color="#006E90"
                                    value="recurring"
                                    status={installmentsType === 'recurring' ? 'checked' : 'unchecked'}
                                    onPress={() => setInstallmentsType('recurring')}
                                />
                                <Text>Contínuo</Text>
                            </View>
                        </View>
                        {installmentsType === 'installments' && (
                            <View style={styles.installments}>
                                <Text>Em quantas vezes?</Text>
                                <TextInput
                                    style={styles.installmentsButton}
                                    onChangeText={text => setInstallments(text.replace(/[^0-9]/g, ''))}
                                    value={installments}
                                    placeholder="0"
                                    keyboardType="numeric"
                                />
                            </View>
                        )}
                    </View>
                )}
                <View>
                    <Text>Qual valor R$?</Text>
                    <TextInput
                        style={styles.billName}
                        onChangeText={text => setBillName(text)}
                        value={billName}
                        placeholder="Nome da pessoa/empresa"
                    />
                </View>
                <View>
                    <TouchableOpacity 
                        onPress={() => {}}
                    >
                        <Text>Adicionar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 20,
        backgroundColor: "#D4E9F3",
        width: "100%"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#124734"
    },
    content: {
        width: 350,
        flex: 1,
        alignItems: "center",
        padding: 40,
        marginVertical: 20,
        backgroundColor: "#A0C4D6",
        borderRadius: 20,
        gap: 20
    },
    opPayReceive : {
        flexDirection: "row",
        gap: 40,
        justifyContent: "space-between"
    },
    button: {
        backgroundColor: "#415A77",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "white"
    },
    activeButton: {
        backgroundColor: "#006E90"
    },
    billName: {
        height: 50,
        width: 200,
        borderRadius: 8,
        backgroundColor: "#006E90",
        textAlign: "center",
        alignSelf: "center"
    },
    opInstallment: {
        flexDirection: "row",
        alignItems: "center",
        height: 30
    },
    opInstallmentsTitle: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    },
    installments: {
        alignItems: "center"
    },
    installmentsButton: {
        height: 50,
        width: 50,
        borderRadius: 8,
        backgroundColor: "#006E90",
        textAlign: "center"
    },
    radioGroup: {
        width: 200,
        gap: 5
    },
    radioOp: {
        width: 200,
        height: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 10,
    }
})