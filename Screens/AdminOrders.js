import { Pressable, StyleSheet, Text, View, TouchableOpacity, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../Globals/globalStyles";
import { FlatList } from "react-native-gesture-handler";
import { collection, addDoc, getDocs, onSnapshot, query, where, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const AdminOrders = () => {
  const [arrayList, setArrayList] = useState([]);
  const [sarasaviGirls, setSarasaviGirls] = useState(false);
  const [newSarasavi, setNewSarasavi] = useState(false);
  const [nilaweli, setNilaweli] = useState(false);
  const [marbel, setMarbel] = useState(false);
  const [boysHostel, setBoysHostel] = useState(true);

  const dataList = [
    { name: "Fried Rice", activeStatus: "pending", quantity: "2", totalPrice: "400", address: "Nilaweli Hostel" },
    { name: "Fried Rice", activeStatus: "pending", quantity: "2", totalPrice: "400", address: "Nilaweli Hostel" },
    { name: "Fried Rice", activeStatus: "pending", quantity: "2", totalPrice: "400", address: "Nilaweli Hostel" },
  ];

  useEffect(() => {
    var t = false;
    var size = arrayList.length;
    const q = query(collection(db, "orders"), where("status", "==", "Pending"));
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

  const OnBtnClick = (btn) => {
    switch (btn) {
      case "boys":
        setBoysHostel(true);
        setSarasaviGirls(false);
        setMarbel(false);
        setNilaweli(false);
        setNewSarasavi(false);
        break;
      case "sarasavi":
        setSarasaviGirls(true);
        setBoysHostel(false);
        setMarbel(false);
        setNilaweli(false);
        setNewSarasavi(false);
        break;
      case "newSarasavi":
        setNewSarasavi(true);
        setSarasaviGirls(false);
        setBoysHostel(false);
        setMarbel(false);
        setNilaweli(false);
        break;
      case "marbel":
        setMarbel(true);
        setSarasaviGirls(false);
        setNewSarasavi(false);
        setBoysHostel(false);
        setNilaweli(false);
        break;
      case "nilaweli":
        setNilaweli(true);
        setSarasaviGirls(false);
        setNewSarasavi(false);
        setBoysHostel(false);
        setMarbel(false);
        break;
    }
  };

  const onSearchPress = () => {};

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Orders To Deliver</Text>
      </View>
      <View style={styles2.hostelBtnContainer}>
        <Pressable style={boysHostel ? [styles2.hostelBtn, styles2.active] : [styles2.hostelBtn]} onPress={() => OnBtnClick("boys")}>
          <Text style={styles2.btnContent}>Boys Hostel</Text>
        </Pressable>
        <Pressable style={!sarasaviGirls ? styles2.hostelBtn : [styles2.hostelBtn, styles2.active]} onPress={() => OnBtnClick("sarasavi")}>
          <Text style={styles2.btnContent}>Sarasavi Girls</Text>
        </Pressable>
        <Pressable style={!newSarasavi ? styles2.hostelBtn : [styles2.hostelBtn, styles2.active]} onPress={() => OnBtnClick("newSarasavi")}>
          <Text style={styles2.btnContent}>New Sarasavi Girls</Text>
        </Pressable>
        <Pressable style={!nilaweli ? styles2.hostelBtn : [styles2.hostelBtn, styles2.active]} onPress={() => OnBtnClick("nilaweli")}>
          <Text style={styles2.btnContent}>Nilaweli Boys</Text>
        </Pressable>
        <Pressable style={!marbel ? styles2.hostelBtn : [styles2.hostelBtn, styles2.active]} onPress={() => OnBtnClick("marbel")}>
          <Text style={styles2.btnContent}>Marbel Girls</Text>
        </Pressable>
      </View>
      <View style={styles2.notificationBtn}>
        <Text style={styles2.notificationcontent}>Send Notification</Text>
      </View>
      <View style={styles2.searchItems}>
        <TextInput placeholder="Search Order" style={styles2.search} />
        <Pressable onPress={onSearchPress} style={styles2.searchBtn}>
          <Text style={styles2.searchBtnContent}>Search</Text>
        </Pressable>
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
                <Text style={styles.quantity}>UserName: {item.userName}</Text>
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
    marginBottom: 3,
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
    marginBottom: 5,
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
    marginBottom: 10,
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

const styles2 = StyleSheet.create({
  hostelBtnContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },

  hostelBtn: {
    width: 112,
    height: 50,
    backgroundColor: "#BFBFBF",
    marginRight: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  btnContent: {
    textAlign: "center",
    color: "white",
  },

  active: {
    backgroundColor: "coral",
  },

  notificationBtn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "coral",
    borderRadius: 8,
  },

  notificationcontent: {
    fontWeight: "800",
    color: "white",
    width: "100%",
    textAlign: "center",
  },

  searchItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  search: {
    flex: 1,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 10,
    borderRadius: 8,
    borderColor: "#bfbfbf",
    borderWidth: 1,
  },

  searchBtn: {
    width: 100,
    height: 50,
    alignItems: "center",
    backgroundColor: "#bfbfbf",
    justifyContent: "center",
    borderRadius: 8,
  },

  searchBtnContent: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
});
