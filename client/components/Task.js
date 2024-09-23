
import { StyleSheet, View, Text } from "react-native";

const Task = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    margin: 10 ,
    borderRadius:10,
  },
  title: {
    color: '#312f2f',
    marginBottom: 10
  }
})

export default Task;
