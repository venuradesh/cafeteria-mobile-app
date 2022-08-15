import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import globalStyles from "../Globals/globalStyles";
import { useState } from "react";
import { collection, addDoc , getDocs, onSnapshot , query, where , doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const AdminHome = () => {
  const [breakfast, setBreakFast] = useState(true);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [breakFirstList, setBreakFirstList] = useState([]);
  const [lunchList, setLunchList] = useState([]);
  const [dinnerList, setDinnerList] = useState([]);

  const onBreakFastClick = () => {
    setBreakFast(true);
    setLunch(false);
    setDinner(false);
  };
  const onLunchClick = () => {
    setBreakFast(false);
    setLunch(true);
    setDinner(false);
  };
  const onDinnerClick = () => {
    setBreakFast(false);
    setLunch(false);
    setDinner(true);
  };

  useEffect(() => {
    
    var t = false;
    var breakFirstSize = breakFirstList.length;
    var lunchSize = lunchList.length;
    var dinnerSize = dinnerList.length;
    const q = query(collection(db, "orders"),where("status","==","Pending"));
    const user = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if(doc.data().mealsTime=="breakfirst"){
          var t = true;
          for (let i = 0; i < breakFirstSize; i++) {
            if (breakFirstList[i].orderId == doc.data().orderId) {
              t = false;
              break;
            }
          }
          if (t) {
            setBreakFirstList((prev) => [...prev, doc.data()]);
          }
          console.log(doc.data().orderId);
          console.log(breakFirstSize);
        }
        else if(doc.data().mealsTime=="lunch"){
          var t = true;
          for (let i = 0; i < lunchSize; i++) {
            if (lunchList[i].orderId == doc.data().orderId) {
              t = false;
              break;
            }
          }
          if (t) {
            setLunchList((prev) => [...prev, doc.data()]);
          }
        }
        else if(doc.data().mealsTime=="dinner"){
          var t = true;
          for (let i = 0; i < dinnerSize; i++) {
            if (dinnerList[i].orderId == doc.data().orderId) {
              t = false;
              break;
            }
          }
          if (t) {
            setDinnerList((prev) => [...prev, doc.data()]);
          }
        }
        
      });
    });
  }, []);

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={[styles.totalOrdersContainer]}>
        <View style={styles.btnContainer}>
          <Pressable onPress={onBreakFastClick} style={!breakfast ? [styles.btn] : [styles.btn, styles.btnClicked]}>
            <Text style={styles.btnContent}>Breakfast</Text>
          </Pressable>
          <Pressable onPress={onLunchClick} style={!lunch ? [styles.btn] : [styles.btn, styles.btnClicked]}>
            <Text style={styles.btnContent}>Lunch</Text>
          </Pressable>
          <Pressable onPress={onDinnerClick} style={!dinner ? [styles.btn] : [styles.btn, styles.btnClicked]}>
            <Text style={styles.btnContent}>Dinner</Text>
          </Pressable>
        </View>
        <View style={[styles.boxContainer, styles.totalCount]}>
          <Text style={[styles.boxContent, styles.totalCountContent]}>Total Orders: {breakFirstList.length+lunchList.length+dinnerList.length}</Text>
        </View>
      </View>
      <View style={[styles.pendingCountContainer, styles.boxWrapper]}>
        <View style={[styles.pendingCount, styles.boxContainer]}>
          <Text style={[styles.pendingCountContent, styles.boxContent]}>To be Delivered: 
          {
            breakfast?breakFirstList.length:(lunch?lunchList.length:dinnerList.length)
          }
          </Text>
        </View>
      </View>
      <Pressable style={[styles.boxWrapper, styles.activeContainer]}>
        <View style={[styles.active, styles.boxContainer]}>
          <Text style={[styles.boxContent, styles.activeContent]}>Make Offers</Text>
          <Text style={styles.activeHours}>(Active only for 1 hour)</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  boxWrapper: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  boxContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#bfbfbf",
    justifyContent: "center",
    borderRadius: 12,
  },

  boxContent: {
    width: "100%",
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },

  activeContainer: {
    height: 80,
  },

  activeContent: {
    marginBottom: 10,
  },

  activeHours: {
    color: "white",
    width: "100%",
    textAlign: "center",
  },

  btnContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  btn: {
    width: 110,
    height: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 0,
  },

  btnContent: {
    color: "black",
  },

  btnClicked: {
    backgroundColor: "coral",
  },

  totalCount: {
    height: 50,
    backgroundColor: "white",
  },

  totalOrdersContainer: {
    marginBottom: 20,
    backgroundColor: "#bfbfbf",
    padding: 10,
    borderRadius: 12,
    paddingVertical: 20,
  },

  totalCountContent: {
    color: "#bfbfbf",
  },
});
