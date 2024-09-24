import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import CheckMark from "./CheckMark";
import { useFonts, Solitreo_400Regular } from "@expo-google-fonts/solitreo";

const Task = ({ title, id, completed, toggleTodo }) => {
  let [fontsLoaded] = useFonts({Solitreo_400Regular});
  if (!fontsLoaded) return null;

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.row}>
        <CheckMark completed={completed} />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    color: "#312f2f",
    fontSize: 16,
    fontFamily: "Solitreo_400Regular",
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});

export default Task;
