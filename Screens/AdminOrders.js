import { Pressable, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../Globals/globalStyles";
import { FlatList } from "react-native-gesture-handler";
import { collection, addDoc , getDocs, onSnapshot , query, where , doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const AdminOrders = () => {
  const [arrayList, setArrayList] = useState([]);
  const dataList = [
    { name: "Fried Rice", activeStatus: "pending", quantity: "2", totalPrice: "400", address: "Nilaweli Hostel" },
    { name: "Fried Rice", activeStatus: "pending", quantity: "2", totalPrice: "400", address: "Nilaweli Hostel" },
    { name: "Fried Rice", activeStatus: "pending", quantity: "2", totalPrice: "400", address: "Nilaweli Hostel" },
  ];

  useEffect(() => {
    
    var t = false;
    var size = arrayList.length;
    const q = query(collection(db, "orders"),where("status","==","Pending"));
    const user = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var t = true;
        for (let i = 0; i < size; i++) {
          if (arrayList[i].orderId == doc.data().orderId) {
            t = false;
            break;
          }
        }
        if (t) {
          setArrayList((prev) => [...prev, doc.data()]);
        }
      });
    });
  }, []);


  const onDelivered = () => {};

  

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Orders To Deliver</Text>
      </View>
      <View style={styles.itemListContainer}>
        <FlatList
          data={arrayList}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemTitle}>
                <Text style={styles.itemTitleContent}>{item.itemName}</Text>
              </View>
              <View style={styles.quantityPriceContainer}>
                <Text style={styles.quantity}>UserName:{item.userName}</Text>
              </View>
              <View style={styles.quantityPriceContainer}>
                <Text style={styles.quantity}>Order Id: {item.orderId}</Text>
              </View>
              <View style={styles.quantityPriceContainer}>
                <Text style={styles.quantity}>Qty:{item.quantity}</Text>
                <Text style={styles.price}>Rs. {item.total}/-</Text>
              </View>
              <View style={styles.addressContainer}>
                <View style={styles.address}>
                  <Text style={styles.addressContent}>Hostel: {item.hostel}</Text>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity onPress={onDelivered} style={styles.btn}>
                  <Text style={styles.btnText}>Mark As Delivered</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default AdminOrders;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  titleContainer: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    width: "100%",
    fontSize: 28,
    color: "coral",
    fontWeight: "800",
    textAlign: "center",
    textTransform: "uppercase",
  },

  itemListContainer: {
    flex: 1,
    marginTop: 20,
  },

  itemContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#bfbfbf",
    marginBottom: 20,
    padding: 20,
  },

  itemTitle: {
    width: "100%",
    marginBottom: 5,
  },

  itemTitleContent: {
    width: "100%",
    fontSize: 24,
    fontWeight: "800",
    color: "coral",
  },

  quantityPriceContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  quantity: {
    fontSize: 18,
    color: "#bfbfbf",
  },

  price: {
    fontSize: 24,
  },

  addressContainer: {
    width: "100%",
    marginBottom: 20,
  },

  addressContent: {
    fontSize: 18,
    fontWeight: "800",
    color: "#bfbfbf",
  },

  btnContainer: {
    width: "100%",
  },

  btn: {
    width: "100%",
    height: 50,
    backgroundColor: "coral",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },
});
