import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import globalStyles from "../Globals/globalStyles";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { useNavigation } from "@react-navigation/native";


const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const navigation=useNavigation();
  if(global.user=='client'){
    navigation.navigate("home", {userid:global.id });
  }
  else if(global.user=='client'){
    navigation.navigate("adminHome", {userid:global.id });
  }
  
  
  const checkLogin = async () => {
    try {
      var t = false;
      global.mealTime="breakfirst";
      const querySnapshot1 = await getDocs(collection(db, "clients"));
      querySnapshot1.forEach((doc) => {
        if (doc.data().userName == userName && doc.data().password == password) {
          t = true;
          const userid=doc.id;
          global.user='client';
          global.id=userid;
          global.userName=userName;
          global.hostel=doc.data().hostel;
          global.phone=doc.data().phoneNumber;
          resetBtn();
          setPasswordIncorrect(false);
          navigation.navigate("home", {userid:userid });
          //navigation.navigate('home', {screen: 'ScreenC',params : { param1: "foo", param2: "bar" }})
        }
      });
      const querySnapshot2 = await getDocs(collection(db, "caterers"));
      querySnapshot2.forEach((doc) => {
        if (doc.data().userName == userName && doc.data().password == password) {
          const userid=doc.id;
          global.canteen=doc.data().venue;
          global.user='caterer';
          global.id=userid;
          global.userName=userName;
          t = true;
          console.log(doc.data().venue);
          resetBtn();
          setPasswordIncorrect(false);
          navigation.navigate("adminHome", {userid:userid });
        }
      });
      if (!t) {
        setPasswordIncorrect(true);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const resetBtn = () => {
    setPassword('');
    setUserName('');
    setPasswordIncorrect(false);
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
            <TextInput style={styles.input} onChangeText={(val) => setUserName(val)} value={userName}/>
          </View>
          <View style={styles.inputItem}>
            <Text style={styles.inputTextContent}>Password</Text>
            <TextInput style={styles.input} secureTextEntry={true} onChangeText={(val) => setPassword(val)} value={password} />
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
          <Pressable style={[styles.btn, styles.btnReset]} onPress={resetBtn}>
            <Text style={styles.btnContent}>Reset</Text>
          </Pressable>
        </View>
        <View>
          <View style={styles.item}>
            <Text style={styles.orelse}>Or</Text>
          </View>
          <Pressable style={[styles.btnFacebook]}>
            <Text style={styles.textBtn}>Sign Up with Facebook</Text>
          </Pressable>
          <Pressable style={[styles.btnFacebook, styles.btnGoogle]}>
            <Text style={styles.textBtn}>Sign Up with Google</Text>
          </Pressable>
        </View>
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
