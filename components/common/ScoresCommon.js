import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import useLocalStorage from "../hooks/useLocalStorage";



const DARK_BLUE = '#0A2463';
const LIGHT_BLUE = "#247BA0";

const DARK_RED = "#FB3640";
const LIGHT_RED = "#FFD3D5"

const DARK_GREY = "#605F5E";
const LIGHT_GREY = "#E2E2E2";

export default function ScoresCommon({url, score, setScore}) {
    const randomId = crypto.randomUUID();
    const [userId] = useLocalStorage('userId', randomId);
    useEffect(
        () => {
            fecthScores(url, userId, setScore);
        }
    ,[])

    return (
    <View id="ScoresContainer" style={styles.scoresContainer}>
        <View id="Player1ScoreContainer" style={styles.valueAndLabelContainers}>
            <Text id="Player1WinsValue" style={{...styles.value, backgroundColor: DARK_BLUE, color: 'white'}}>{score.player1Wins}</Text>
            <Text id="Player1WinsLabel" style={{...styles.label, backgroundColor: DARK_BLUE, color: 'white'}}>Player 1 Wins</Text>
        </View>
        <View id="DrawsScoreContainer" style={styles.valueAndLabelContainers}>
            <Text id="DrawsValue" style={{...styles.value, backgroundColor: DARK_GREY, color: 'white'}}>{score.draws}</Text>
            <Text id="DrawsLabel" style={{...styles.label, backgroundColor: DARK_GREY, color: 'white'}}>Draws</Text>
        </View>
        <View id="Player2ScoreContainer" style={styles.valueAndLabelContainers}>
            <Text id="Player2WinsValue" style={{...styles.value, backgroundColor: DARK_RED}}>{score.player2Wins}</Text>
            <Text id="Player2WinsLabel" style={{...styles.label, backgroundColor: DARK_RED}}>Player 2 Wins</Text>
        </View>
        <View id="TotalGamesScoreContainer" style={styles.valueAndLabelContainers}>
            <Text id="TotalGamesValue" style={{...styles.value, backgroundColor: LIGHT_GREY}}>{score.totalGames}</Text>
            <Text id="TotalGamesLabel" style={{...styles.label, backgroundColor: LIGHT_GREY}}>Total games</Text>
        </View>
    </View>
    )
}

export const fecthScores = async (url, userId, setScores) => {
    const response = await fetch(
        url,
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
    setScores(data);
}




const styles = StyleSheet.create({
    scoresContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
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
        fontSize: '10em',
        alignContent: "center",
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        flex: 1,
        width: '100%',
        height: '100%',
        fontSize: '2em',
        alignContent: "center",
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    }
  });