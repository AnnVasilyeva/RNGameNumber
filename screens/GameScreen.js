import { View, StyleSheet, Alert, Text, FlatList } from  'react-native';
import Title from '../components/ui/Title';
import { useState, useEffect } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons } from '@expo/vector-icons';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentCuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    useEffect(() => {
        if (currentCuess === userNumber) {
            onGameOver();
        }
    }, [currentCuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])

    function nextGuessHandler(direction) {
        // direction -> 'lower', 'greater'
        if ((direction === 'lower' && currentCuess < userNumber) || 
        (direction === 'greater' && currentCuess > userNumber)) {
            Alert.alert("Don't lie!", 'You know that this is wrong...', [{
                text: 'Sorry!',
                style: 'cancel'
            }]);
            return;
        }
        if (direction === 'lower') {
            maxBoundary = currentCuess;
        } else {
            minBoundary = currentCuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentCuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds])
    }

    const guessRoundsListLength = guessRounds.length;
    
    return (
       <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentCuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuessHandler('lower')}>
                        <Ionicons name="md-remove" size={24} color="white"/>
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={() => nextGuessHandler('greater')}>
                        <Ionicons name="md-add" size={24} color="white"/>
                    </PrimaryButton>
                </View>
            </View> 
        </Card>
        <View>
            {/* {guessRounds.map((guessRound) => <Text key={guessRound}>{guessRound}</Text>)} */}
            <FlatList 
                data={guessRounds} 
                renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item}/>}
                keyExtractor={(item) => item}
            />
        </View>
       </View>
    )
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    instructionText: {
        marginBottom: 12,
    },
});