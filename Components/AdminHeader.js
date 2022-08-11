import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const AdminHeader = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="menu" size={32} color="white" />
      <Text style={styles.text}>Virtual Cafe</Text>
    </View>
  );
};

export default AdminHeader;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: "100%",
    backgroundColor: "coral",
    paddingTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    flexDirection: "row",
    flex: 1,
    textAlign: "center",
  },
});
