import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link } from 'expo-router';
import ScoresCommon from "../common/ScoresCommon";


const DARK_BLUE = '#0A2463';
const LIGHT_BLUE = "#247BA0";

const DARK_RED = "#FB3640";
const LIGHT_RED = "#FFD3D5"

const DARK_GREY = "#605F5E";
const LIGHT_GREY = "#E2E2E2";

const scoresTotalsUrl = 'http://localhost:8080/v1/scores/totals'

export default function Scores() {
    const [score, setScore] = useState(emptyScore);
    return (
    <View id="ScoresAndPressablesContainer" style={styles.scoresAndPressablesContainer}>
        <ScoresCommon url={scoresTotalsUrl} score={score} setScore={setScore}/>
        <View id="PressablesContainer" style={styles.pressablesContainer}>
            <Link href="/" asChild>
                <Pressable style={{...styles.pressable, backgroundColor: LIGHT_BLUE }}>
                    <Text style={{...styles.pressableText }}>Back to games</Text>
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


const styles = StyleSheet.create({
    scoresAndPressablesContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pressablesContainer: {
        flex: 0.1,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        display: 'flex',
        alignItems: 'center',
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
        textAlign: 'center',
        alignItems: 'center',
        alignContent: "center",
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        fontSize: '3em',
    }
    
  });