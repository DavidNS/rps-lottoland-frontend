import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import useLocalStorage from "../hooks/useLocalStorage";


export default function Games() {
    const [userId] = useLocalStorage('userId', 'user-1');
    const [score, setScore] = useState(emptyScore);
    const [game, setGame] = useState(emptyGame);

    const onNewGamePress = (e) => {
        fecthGamesScoresPlayers(setScore, setGame, userId);
    }

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
        <View id="GamesContainer" style={styles.gamesContainer}>
            <View id="GamesResultsContainer" style={styles.gamesResultsContainer}>
                <View id="Player1GameContainer" style={styles.valueAndLabelContainers}>
                    <Text>{game.player1Result}</Text>
                    <Text>Player 1</Text>
                </View>
                <View id="ResultGameContainer" style={styles.valueAndLabelContainers}>
                    <Text>{game.gameResult}</Text>
                    <Text>Result</Text>
                </View>
                <View id="Player2GameContainer" style={styles.valueAndLabelContainers}>
                    <Text>{game.player2Result}</Text>
                    <Text>Player 2</Text>
                </View>
            </View>
            <View id="NewGamesContainer" style={styles.newGamesContainer}>
                <Pressable style={styles.newGamesPressable} onPress={onNewGamePress}>
                    <Text style={styles.newGamesPressableText}>New Game</Text>
                </Pressable>
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

const emptyGame = {
    gameResult: "NONE",
	player1Result: "NONE",
	player2Result: "NONE"
}

const fecthScoresPlayers = async (setScores) => {
    console.log('fetching player scores')
    const response = await fetch(
        'http://localhost:8080/v1/scores/players',
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

const fecthGamesScoresPlayers = async (setScores, setGames, userId) => {
    console.log('fetching new player games scores')
    const response = await fetch('http://localhost:8080/v1/games/players',
        {
            method: 'GET',
            headers: {
                'x-device-id' : userId
            }
        });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setScores(data.scoreOut);
    setGames(data.gameOut);
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
    gamesContainer: {
        flex: 1,
        width: '100%',
        overflow: 'auto',
        display: 'flex',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gamesResultsContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        overflow: 'auto',
        display: 'flex',
        backgroundColor: 'pink',
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
    },
    newGamesContainer: {
        flex: 1,
        width: '100%',
        overflow: 'auto',
        display: 'flex',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
    },
    newGamesPressable: {
        backgroundColor: 'green',
        width: '100%',
        overflow: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    newGamesPressableText: {
        fontSize: '100px',
    }
  });