import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import globalStyles from "../Globals/globalStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, addDoc, getDocs, onSnapshot, query, where, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

const MyOrders = () => {
  const [arrayList, setArrayList] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();
  const userid = route.params.params.params.userid;
  console.log(userid);

  const [si,setSi]=useState(0);

  useEffect(() => {
    var t = false;
    var size = arrayList.length;
    const q = query(collection(db, "orders"), where("userid", "==", userid));
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
          if(doc.data().status=="Pending"){
            setSi(si+1);
          }
          setArrayList((prev) => [...prev, doc.data()]);
        }
      });
    });
  }, []);

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.boxWrapper}>
        <View style={[styles.pendingCount, styles.boxContainer]}>
          <Text style={[styles.pendingCountContent, styles.boxContent]}>Pending Orders: {si}</Text>
        </View>
      </View>
      <Text style={styles.pendings}>Pendings</Text>
      <View style={styles.pendingListContainer}>
        <FlatList
          data={arrayList}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{item.itemName}</Text>
                  <Text style={styles.quantity}>orderId: {item.orderId}</Text>
                </View>
                <View style={styles.quantityPriceContainer}>
                  <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                  <Text style={styles.price}>Total Price: Rs. {item.total}/-</Text>
                </View>
                <View style={styles.activeContainer}>
                  <Text style={styles.status}>Status: {item.status}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default MyOrders;

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
    width: "70%",
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

  pendings: {
    fontSize: 24,
    color: "#bfbfbf",
    marginBottom: 20,
    fontWeight: "800",
    textTransform: "uppercase",
  },

  pendingListContainer: {
    flex: 1,
  },

  itemContainer: {
    width: "100%",
    height: 150,
    marginBottom: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderRadius: 8,
    overflow: "hidden",
  },

  imageContainer: {
    width: "40%",
    height: "100%",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  contentContainer: {
    padding: 10,
    justifyContent: "space-between",
  },

  titleContainer: {
    width: "100%",
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "coral",
  },

  quantityPriceContainer: {
    width: "100%",
  },

  quantity: {
    marginBottom: 5,
    color: "#bfbfbf",
  },

  price: {
    color: "#bfbfbf",
    fontSize: 18,
  },

  activeContainer: {
    width: "100%",
  },

  status: {
    fontSize: 20,
  },
});
