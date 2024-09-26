import { StyleSheet, Pressable } from "react-native";

const CheckMark = ({ id, completed, toggleTodo }) => {
  const toggle = async () => {
    const response = await fetch(`http://192.168.1.2:8080/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ value: completed ? false : true }),
    });
    const data = await response.json();
    toggleTodo(id);
  };
  return (
    <Pressable
      style={[ styles.checkMark, { backgroundColor: completed ? "#10ca4e" : "#d5d5d8" },
      ]}
      onPress={toggle}
    ></Pressable>
  );
};

const styles = StyleSheet.create({
  checkMark: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default CheckMark;
