import { useState } from 'react';
import { TextInput, View , StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from '../constants/colors';
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';

function StartGameScreen ({ onPickNumber }) {

    const [enteredNumber, setEnteredNumber] = useState('');

    const numberInputHandler = (enteredText) => {
        setEnteredNumber(enteredText);
    }

    const resetInputHandler = () => {
        setEnteredNumber(''); 
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid Number!', // title
                'Number has to be a number between 1 and 99.', // message
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}] // buttons
            )
            return;
        }
        onPickNumber(chosenNumber);
    }


    return (
        <View style={styles.rootContainer}>
            <View>
                <Title>Guess My Number</Title>
            </View>
            <Card>
                <InstructionText style={styles.instructionText}>Enter a Number</InstructionText>
                <TextInput 
                    style={styles.numberInput} 
                    // ограничить только двумя значениями для ввода
                    maxLength={2} 
                    // вывод клавиатуры с цифрами
                    keyboardType="number-pad"
                    // не дает использовать заглавные буквы для определенных символов 
                    autoCapitalize="none"
                    // не делает авто-корректировку
                    autoCorrect={false}
                    onChangeText={numberInputHandler}
                    value={enteredNumber}
                />
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={resetInputHandler}
                        >Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton 
                            onPress={confirmInputHandler}
                        >Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    )
}

export default StartGameScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    },
    numberInput: {
        width: 50,
        height: 50,
        fontSize: 32,
        fontWeight: 'bold',
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    }
});