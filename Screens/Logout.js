import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Logout = ({ navigation }) => {
  global.user='';
  global.id='';
  navigation.navigate("login");
};

export default Logout;

const styles = StyleSheet.create({});
