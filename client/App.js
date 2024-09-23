import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Task } from "./components";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // const resp = await fetch("https://localhost:443/todos/1");
        const resp = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await resp.json();
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  console.log(todos);
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.saveAreaStyle}>
        <StatusBar style="auto" />
        <FlatList
          ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
          contentContainerStyle={styles.contentContainer}
          scrollEnabled={true}
          data={todos}
          keyExtractor={(todo) => todo.id}
          renderItem={({ item }) => (
            <ScrollView>
              <Task key={item?.id} title={item?.title} />
            </ScrollView>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c9b2b2",
    alignItems: "center",
    justifyContent: "center",
  },
  saveAreaStyle: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  title: {
    fontWeight: '800',
    fontSize: 28,
    marginBottom: 15
  },
  contentContainer: {
    padding: 15,
  }
});
