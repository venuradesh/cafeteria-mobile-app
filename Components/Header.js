import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.openDrawer()}>
        <MaterialIcons name="menu" size={32} color="white" />
      </Pressable>
      <Text style={styles.text}>Virtual Cafe</Text>
      <MaterialIcons name="shopping-cart" size={28} color="white" />
    </View>
  );
};

export default Header;

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
