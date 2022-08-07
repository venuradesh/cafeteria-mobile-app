import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";

//global styles
import globalStyles from "../Globals/globalStyles";

export default function StartPage({ navigation }) {
  const onSignInPress = () => {
    navigation.navigate("login");
  };

  const onCreateAccountPress = () => {
    navigation.navigate("signup");
  };

  return (
    <View style={styles.container}>
      <Text style={[globalStyles.titleText, styles.textItem]}>Discover Cafeteria In Your Campus</Text>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/cafeteria.jpg")} style={{ width: 400, height: 200 }} resizeMode="cover" />
      </View>
      <View style={styles.btnContainer}>
        <Pressable onPress={onSignInPress} style={styles.signIn}>
          <Text>Sign In</Text>
        </Pressable>
        <Pressable onPress={onCreateAccountPress} style={styles.createAcc}>
          <Text>Create an Account</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 30,
    paddingTop: 70,
  },

  textItem: {
    color: "coral",
    textAlign: "center",
  },

  imageContainer: {
    paddingVertical: 20,
    backgroundColor: "coral",
  },

  btnContainer: {
    width: "100%",
  },

  signIn: {
    backgroundColor: "coral",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 12,
  },

  createAcc: {
    borderColor: "coral",
    borderWidth: 2,
    marginTop: 10,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 12,
  },
});
