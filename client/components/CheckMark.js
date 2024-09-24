import React from 'react';
import { StyleSheet, Pressable } from "react-native";

const CheckMark = ({ id, completed, toggleTodo }) => {
  
  return (
    <Pressable
      style={[
        styles.checkMark,
        { backgroundColor: completed ? "#0ee957" : "#d5d5d8" },
      ]}
    ></Pressable>
  );
}

const styles = StyleSheet.create({
  checkMark: {
    width: 25,
    height: 25,
    borderRadius: 15
  }
})

export default CheckMark;
