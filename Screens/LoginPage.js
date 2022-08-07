import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React from "react";
import globalStyles from "../Globals/globalStyles";

const LoginPage = () => {
  const onSubmitClick = () => {};

  const onResetClick = () => {};

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.loginWrapper}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, globalStyles.titleText]}>Login</Text>
        </View>
        <View style={styles.inputItemsContainer}>
          <View style={styles.inputItem}>
            <Text style={styles.inputTextContent}>User Name</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.inputTextContent}>Password</Text>
            <TextInput style={styles.input} />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Pressable style={[styles.btn, styles.btnSubmit]} onPress={onSubmitClick}>
            <Text style={styles.btnContent}>Submit</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.btnReset]} onPress={onResetClick}>
            <Text style={styles.btnContent}>Reset</Text>
          </Pressable>
        </View>
        <View style={styles.item}>
          <Text style={styles.orelse}>Or</Text>
        </View>
        <Pressable style={[styles.btnFacebook]}>
          <Text style={styles.textBtn}>Sign In with Facebook</Text>
        </Pressable>
        <Pressable style={[styles.btnFacebook, styles.btnGoogle]}>
          <Text style={styles.textBtn}>Sign In with Google</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    justifyContent: "flex-start",
  },

  titleContainer: {
    alignItems: "center",
  },

  title: {
    color: "coral",
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  btn: {
    paddingVertical: 20,
    borderRadius: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 15,
    width: 150,
  },

  btnFacebook: {
    backgroundColor: "#1E6FD9",
    paddingVertical: 20,
    borderRadius: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 15,
  },

  btnSubmit: {
    backgroundColor: "coral",
  },

  btnReset: {
    borderWidth: 1,
    borderColor: "coral",
  },

  btnGoogle: {
    backgroundColor: "#D93D4A",
  },

  inputItem: {
    marginTop: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#BFBFBF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 5,
  },

  orelse: {
    color: "#999999",
    textAlign: "center",
    fontSize: 24,
  },

  textBtn: {
    color: "#f2f2f2",
    fontWeight: "600",
  },

  btnClick: {
    backgroundColor: "coral",
  },

  inputTextContent: {
    color: "#999999",
    marginLeft: 10,
  },

  item: {
    marginTop: 20,
  },
});
