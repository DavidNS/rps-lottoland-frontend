import { View, StyleSheet } from "react-native";
import Games from "../components/games/Games";

export default function Page() {
  return (
    <View style={styles.container}>
      <Games/>
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