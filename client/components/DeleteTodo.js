import { StyleSheet, Text, Pressable } from "react-native";

const DeleteTodo = () => {  
  return (
    <Pressable  style={styles.btnDelete}>
      <Text style={styles.iconDelete}>X</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btnDelete: {
    backgroundColor: "#ad0000",
    borderRadius: 15,
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -8,
    right:-7,
  },
  iconDelete: {
    color: "#FFFFFF",
  },
});

export default DeleteTodo;
