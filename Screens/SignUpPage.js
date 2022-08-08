import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, Keyboard, ScrollView, TouchableWithoutFeedback } from "react-native";
import { collection, addDoc } from "firebase/firestore"; 
import {db} from '../Firebase/firebase';

//global styles
import globalStyles from "../Globals/globalStyles";

export default function () {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [cateringServiceName, setCateringServiceName] = useState("");
  const [address, setAddress] = useState("");
  const [customerClick, setCustomerClick] = useState(true);
  const [catererClick, setCatererClick] = useState(false);

  const onCustomerClick = () => {
    setCatererClick(false);
    setCustomerClick(true);
  };

  const onCatersClick = () => {
    setCustomerClick(false);
    setCatererClick(true);
  };

  const addClientData=async()=>{
    try {
      const docRef = await addDoc(collection(db, "clients"), {
        firstName:firstName,
        lastName:lastName,
        phoneNumber:phoneNumber,
        password:password,
        userName:userName
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  
  const addCaterdata=async()=>{
    try {
      const docRef = await addDoc(collection(db, "caterers"), {
        firstName:firstName,
        lastName:lastName,
        phoneNumber:phoneNumber,
        password:password,
        userName:userName,
        cateringServiceName:cateringServiceName,
        address:address
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View style={[globalStyles.container, styles.wrapper]}>
          <Text style={[globalStyles.titleText, styles.container]}>Sign-Up</Text>
          <View style={styles.btnContainer}>
            <Pressable onPress={onCustomerClick} style={!customerClick ? [styles.btn, styles.customer] : [styles.btn, styles.btnClick]}>
              <Text style={styles.textBtn}>Customer</Text>
            </Pressable>
            <Pressable onPress={onCatersClick} style={!catererClick ? [styles.btn, styles.caterer] : [styles.btn, styles.btnClick]}>
              <Text style={styles.textBtn}>Caterers</Text>
            </Pressable>
          </View>

          {customerClick ? (
            <View style={styles.inputItems}>
              <View style={styles.item}>
                <Text style={styles.inputTextContent}>User Name</Text>
                <TextInput style={styles.input} onChangeText={(val) => setUserName(val)} />
              </View>
              <View style={styles.item}>
                <Text style={styles.inputTextContent}>First Name</Text>
                <TextInput style={styles.input} onChangeText={(val) => setFirstName(val)} />
              </View>
              <View style={styles.item}>
                <Text style={styles.inputTextContent}>Last Name</Text>
                <TextInput style={styles.input} onChangeText={(val) => setLastName(val)} />
              </View>
              <View style={styles.item}>
                <Text style={styles.inputTextContent}>Phone Number</Text>
                <TextInput style={styles.input} onChangeText={(val) => setPhoneNumber(val)} />
              </View>
              <View style={styles.item}>
                <Text style={styles.inputTextContent}>Password</Text>
                <TextInput style={styles.input} onChangeText={(val) => setPassword(val)} />
              </View>
              <Pressable style={[styles.btnFacebook, styles.btnSubmit]} onPress={addClientData}>
                <Text style={styles.textBtn}>Submit</Text>
              </Pressable>
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
          ) : (
            <View style={styles.inputItems}>
              <View style={styles.item}>
                <Text style={styles.inputTextContent}>User Name</Text>
                <TextInput style={styles.input} onChangeText={(val) => setUserName(val)} />
              </View>
              <View style={styles.item}>
                <Text style={styles.inputTextContent}>First Name</Text>
                <TextInput style={styles.input} onChangeText={(val) => setFirstName(val)} />
              </View>
              <View style={styles.item}>
                <Text style={styles.inputTextContent}>Last Name</Text>
                <TextInput style={styles.input} onChangeText={(val) => setLastName(val)} />
              </View>
              <View style={styles.item}>
                <Text style={styles.inputTextContent}>Phone Number</Text>
                <TextInput style={styles.input} onChangeText={(val) => setPhoneNumber(val)} />
              </View>
              <View style={styles.item}>
                <Text style={styles.inputTextContent}>Catering Service Name</Text>
                <TextInput style={styles.input} onChangeText={(val) => setCateringServiceName(val)} />
              </View>
              <View style={styles.item}>
                <Text style={styles.inputTextContent}>Address</Text>
                <TextInput style={styles.input} onChangeText={(val) => setAddress(val)} />
              </View>
              <View style={styles.item}>
                <Text style={styles.inputTextContent}>Password</Text>
                <TextInput style={styles.input} onChangeText={(val) => setPassword(val)} />
              </View>
              <Pressable style={[styles.btnFacebook, styles.btnSubmit]} onPress={addCaterdata}>
                <Text style={styles.textBtn}>Submit</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop: 10,
  },

  container: {
    color: "coral",
  },

  btn: {
    paddingVertical: 20,
    backgroundColor: "#999999",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 30,
    width: 150,
  },

  btnContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
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

  btnGoogle: {
    backgroundColor: "#D93D4A",
  },
});
