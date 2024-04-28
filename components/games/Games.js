import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import useLocalStorage from "../hooks/useLocalStorage";
import ScoresCommon from "../common/ScoresCommon";
import { Link } from 'expo-router';


const DARK_BLUE = '#0A2463';
const LIGHT_BLUE = "#247BA0";

const DARK_RED = "#FB3640";
const LIGHT_RED = "#FFD3D5"

const DARK_GREY = "#605F5E";
const LIGHT_GREY = "#E2E2E2";

const scoresPlayersUrl = 'http://localhost:8080/v1/scores/players'

export default function Games() {
    const randomId = crypto.randomUUID();
    const [userId] = useLocalStorage('userId', randomId);
    const [score, setScore] = useState(emptyScore);
    const [game, setGame] = useState(emptyGame);

    const onNewGamePress = (e) => {
        fecthGamesScoresPlayers(setScore, setGame, userId);
    }

    const onResetPlayerGames = (e) => {
        fecthResetScoresPlayers(setScore, userId);
        setGame(emptyGame);
    }

    return (
    <View id="ScoresGamesPressablesContainer" style={styles.scoresGamesPressablesContainer} >
        <ScoresCommon url={scoresPlayersUrl} score={score} setScore={setScore}></ScoresCommon>
        <View id="GamesContainer" style={styles.gamesContainer}>
            <View id="GamesResultsContainer" style={styles.gamesResultsContainer}>
                <View id="Player1GameContainer" style={styles.valueAndLabelContainers}>
                    <Text style={{...styles.value, backgroundColor: LIGHT_BLUE}}>{game.player1Result}</Text>
                    <Text style={{...styles.label, backgroundColor: LIGHT_BLUE}}>Player 1</Text>
                </View>
                <View id="ResultGameContainer" style={styles.valueAndLabelContainers}>
                    <Text style={{...styles.value, backgroundColor: LIGHT_GREY}}>{game.gameResult}</Text>
                    <Text style={{...styles.label, backgroundColor: LIGHT_GREY}}>Result</Text>
                </View>
                <View id="Player2GameContainer" style={styles.valueAndLabelContainers}>
                    <Text style={{...styles.value, backgroundColor: DARK_GREY, color: 'white'}}>{game.player2Result}</Text>
                    <Text style={{...styles.label, backgroundColor: DARK_GREY, color: 'white'}}>Player 2</Text>
                </View>
            </View>
        </View>
        <View id="PressablesContainer" style={styles.pressablesContainer}>
            <Pressable style={{...styles.pressable }} onPress={onNewGamePress}>
                <Text style={{...styles.pressableText, backgroundColor: DARK_BLUE, color: 'white'}}>New Game</Text>
            </Pressable>
            <Pressable style={{...styles.pressable }} onPress={onResetPlayerGames}>
                <Text style={{...styles.pressableText, backgroundColor: DARK_RED}}>Reset Player Games</Text>
            </Pressable>
            <Link href="/scores" asChild>
                <Pressable style={{...styles.pressable }} >
                    <Text style={{...styles.pressableText, backgroundColor: LIGHT_GREY}}>Total Scores</Text>
                </Pressable>
            </Link>
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

const fecthGamesScoresPlayers = async (setScores, setGames, userId) => {
    const response = await fetch('http://localhost:8080/v1/games/players',
        {
            method: 'GET',
            headers: {
                'x-device-id' : userId
            }
        }
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setScores(data.scoreOut);
    setGames(data.gameOut);
}

const fecthResetScoresPlayers = async (setScores, userId) => {
    const response = await fetch('http://localhost:8080/v1/scores/players',
        {
            method: 'DELETE',
            headers: {
                'x-device-id' : userId
            }
        }
    );

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setScores(data);
}


const styles = StyleSheet.create({
    scoresGamesPressablesContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    gamesContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gamesResultsContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        overflow: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    valueAndLabelContainers: {
        flex: 1,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    value: {
        flex: 9,
        width: '100%',
        height: '100%',
        fontSize: '5rem',
        alignContent: "center",
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        flex: 1,
        width: '100%',
        height: '100%',
        fontSize: '2rem',
        alignContent: "center",
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pressablesContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        alignContent: "center",
        justifyContent: 'center',
    },
    pressable: {
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        alignContent: "center",
        justifyContent: 'center',
    },
    pressableText: {
        flex: 1,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',
        alignContent: "center",
        justifyContent: 'center',
        fontSize: '2rem',
    }
  });