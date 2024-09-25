import { useState, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useFonts, Solitreo_400Regular } from "@expo-google-fonts/solitreo";
import Feather from "@expo/vector-icons/Feather";
import CheckMark from "./CheckMark";
import DeleteTodo from "./DeleteTodo";
import "react-native-gesture-handler";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import TodoModalContent from "./TodoModalContent";
import SharedTodoModalContent from "./SharedTodoModalContent";

const Task = ({
  title,
  id,
  completed,
  toggleTodo,
  shared_with_id,
  clearTodo,
}) => {
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const sharedBottomSheetRef = useRef(null);
  const snapPoints = ["25%", "48%", "75%"];
  const snapPointsShared = ["40%"];
  let [fontsLoaded] = useFonts({ Solitreo_400Regular });
  if (!fontsLoaded) return null;

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
  };
  const handlePresentShared = () => {
    sharedBottomSheetRef.current?.present();
  };
  const deleteTodo = async () => {
    const response = await fetch(`http://192.168.1.2:8080/todos/${id}`, {
      method: "DELETE",
    });
    clearTodo(id);
  };

  return (
    <TouchableOpacity
      onLongPress={() => setIsDeleteActive(true)}
      onPress={() => setIsDeleteActive(false)}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View style={styles.row}>
        <CheckMark completed={completed} toggleTodo={toggleTodo} id={id} />
        <Text style={styles.title}>{title}</Text>
        <Feather
          name={shared_with_id ? "share" : "users"}
          size={20}
          color="#383839"
          onPress={shared_with_id ? handlePresentModal : handlePresentShared}
          style={styles.icon}
        />
      </View>
      {isDeleteActive && <DeleteTodo onPress={deleteTodo} />}
      <BottomSheetModal
        ref={sharedBottomSheetRef}
        snapPoints={snapPointsShared}
        backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
      >
        <SharedTodoModalContent
          id={id}
          title={title}
          shared_with_id={shared_with_id}
          completed={completed}
        />
      </BottomSheetModal>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={2}
        snapPoints={snapPoints}
        backgroundStyle={{ borderRadius: 50, borderWidth: 4 }}
      >
        <Text>Hola</Text>
      </BottomSheetModal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  title: {
    color: "#312f2f",
    fontSize: 16,
    fontFamily: "Solitreo_400Regular",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});

export default Task;
