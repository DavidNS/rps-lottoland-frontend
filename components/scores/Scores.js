import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";


export default function Scores() {
    const [score, setScore] = useState(emptyScore);

    useEffect(
        () => {
            fecthScoresTotals(setScore)
        }
    )

    return (
    <View id="ScoresGamesContainer" style={styles.scoresGamesContainer} >
        <View id="ScoresContainer" style={styles.scoresContainer}>
            <View id="Player1ScoreContainer" style={styles.valueAndLabelContainers}>
                <Text>{score.player1Wins}</Text>
                <Text>Player 1 Wins</Text>
            </View>
            <View id="Player2ScoreContainer" style={styles.valueAndLabelContainers}>
                <Text>{score.player2Wins}</Text>
                <Text>Player 2 Wins</Text>
            </View>
            <View id="DrawsScoreContainer" style={styles.valueAndLabelContainers}>
                <Text>{score.draws}</Text>
                <Text>Draws</Text>
            </View>
            <View id="TotalGamesScoreContainer" style={styles.valueAndLabelContainers}>
                <Text>{score.totalGames}</Text>
                <Text>Total games</Text>
            </View>
        </View>
    </View>
    )
}

const emptyScore = {
    totalGames: 0,
	player1Wins: 0,
	player2Wins: 0,
	draws: 0
}

const fecthScoresTotals = async (setScores) => {
    console.log('fetching total scores')
    const response = await fetch(
        'http://localhost:8080/v1/scores/totals',
        {
            method: 'GET',

        }
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setScores(data);
    console.log(data);
}


const styles = StyleSheet.create({
    scoresGamesContainer: {
      flex: 1,
      width: '100%',
      overflow: 'auto',
      display: 'flex',
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scoresContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        overflow: 'auto',
        display: 'flex',
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueAndLabelContainers: {
        flex: 1,
        backgroundColor: 'blue',
        width: '100%',
        fontSize: '100px',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
  });