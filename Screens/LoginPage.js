import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import globalStyles from "../Globals/globalStyles";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const LoginPage = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);

  const checkLogin = async () => {
    try {
      const querySnapshot1 = await getDocs(collection(db, "clients"));
      querySnapshot1.forEach((doc) => {
        if (doc.data().userName == userName && doc.data().password == password) {
          console.log("Client a" + doc.data().userName + " " + doc.data().password);
          navigation.navigate("home");
        }
      });
      const querySnapshot2 = await getDocs(collection(db, "caterers"));
      querySnapshot2.forEach((doc) => {
        if (doc.data().userName == userName && doc.data().password == password) {
          console.log("Caterer" + doc.data().userName + " " + doc.data().password);
        }
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.loginWrapper}>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, globalStyles.titleText]}>Login</Text>
        </View>
        <View style={styles.inputItemsContainer}>
          <View style={styles.inputItem}>
            <Text style={styles.inputTextContent}>User Name</Text>
            <TextInput style={styles.input} onChangeText={(val) => setUserName(val)} />
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.inputTextContent}>Password</Text>
            <TextInput style={styles.input} onChangeText={(val) => setPassword(val)} />
          </View>
        </View>
        {passwordIncorrect ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorContent}>Username or Password Incorrect</Text>
          </View>
        ) : (
          <View></View>
        )}
        <View style={styles.btnContainer}>
          <Pressable style={[styles.btn, styles.btnSubmit]} onPress={checkLogin}>
            <Text style={styles.btnContent}>Submit</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.btnReset]}>
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

  errorContainer: {
    height: 40,
    marginBottom: -20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  errorContent: {
    color: "#F23D3D",
    fontSize: 18,
  },
});
