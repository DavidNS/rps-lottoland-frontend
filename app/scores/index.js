import { View, StyleSheet } from "react-native";
import Scores from "../../components/scores/Scores";


export default function Page() {
  return (
    <View style={styles.container}>
      <Scores/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});