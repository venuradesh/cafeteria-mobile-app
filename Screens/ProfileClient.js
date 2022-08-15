import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs, onSnapshot, query, where, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const ProfileClient = () => {

  const [userDetails,setUserDetails]=useState([]);
  useEffect(()=>{
    const q = query(collection(db, "clients"),where("userName","==",global.userName));
    const user = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        setUserDetails([doc.data()]);
    })})
  },[]);

  console.log(userDetails[0].firstName);
  return (
    <View>
      <Text>{userDetails[0].firstName}</Text>
    </View>
  );
};

export default ProfileClient;

const styles = StyleSheet.create({});
