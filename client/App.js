import { SafeAreaView, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ListTodos } from "./components";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <StatusBar style="light" />
        <SafeAreaView style={styles.saveAreaStyle}>
          <ListTodos />
          {/* <InputTask todos={todos} setTodos={setTodos} /> */}
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  saveAreaStyle: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#272c47",
  },
});
