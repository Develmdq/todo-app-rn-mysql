import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { SafeAreaView, StyleSheet} from "react-native";
import { ListTodos } from "./components";

export default function App() {  
  return (
    <SafeAreaView style={styles.saveAreaStyle}>
      <StatusBar style="auto" hidden />
      <ListTodos />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({  
  saveAreaStyle: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#272c47",
 
  },
  
});
