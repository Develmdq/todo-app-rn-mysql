import { useState, useEffect } from "react";
import { FlatList, ScrollView, StyleSheet, Text } from "react-native";
import Task from "./Task";

const ListTodos = () => {
  const [todos, setTodos] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch("http://192.168.1.2:8080/todos/1");
        const data = await resp.json();
        setTodos(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);
  return (
    <FlatList
      ListHeaderComponent={() => <Text style={styles.title}>Today</Text>}
      contentContainerStyle={styles.contentContainer}
      scrollEnabled={true}
      data={todos}
      keyExtractor={(todo) => todo.id}
      renderItem={({ item }) => (
        <ScrollView>
          <Task {...item} />
        </ScrollView>
      )}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: "#e7e7e7",
  },
});

export default ListTodos;
