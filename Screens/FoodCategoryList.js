import { StyleSheet, Text, View, FlatList, Image, SafeAreaView, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, addDoc, getDocs, onSnapshot, query, where, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { useNavigation, useRoute } from "@react-navigation/native";

//components
import globalStyles from "../Globals/globalStyles";

const FoodCategoryList = () => {
  const [arrayList, setArrayList] = useState([]);
  const navigation =useNavigation();
  const route=useRoute();
  
  
  useEffect(() => {
    var t = false;
    var size = arrayList.length;
    const q = query(collection(db, "foods"), where("foodType", "==", route.params.itemName));
    const user = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var t = true;
        for (let i = 0; i < size; i++) {
          if (arrayList[i].key == doc.data().key) {
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
  const onItemClick = (itemDetails) => {
    const userid=route.params.userid;
    navigation.navigate("itemDes", { itemDetails, userid});
  };

  return (
    <SafeAreaView style={[globalStyles.container, styles.container]}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleContent}>{route.params.itemName}</Text>
      </View>
      <View style={styles.itemsListContainer}>
        <FlatList
          data={arrayList}
          horizontal={false}
          renderItem={({ item }) => {
            return (
              <Pressable style={styles.offersContainer} onPress={() => onItemClick(item)}>
                <View style={styles.offersImageContainer}>
                  <Image style={styles.offersImage} source={item.image} />
                </View>
                <View style={styles.offerTitleContainer}>
                  <Text style={styles.offerTitleContent}>{item.name}</Text>
                </View>
                <View style={styles.offerDetailsContainer}>
                  <View style={styles.offerPrice}>
                    <Text style={styles.offerPriceContent}>{item.price}</Text>
                  </View>
                  <View style={styles.offerLocation}>
                    <MaterialIcons name="location-pin" size={24} color="#BFBFBF" />
                    <Text style={styles.offerLocationContent}>{item.venue}</Text>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default FoodCategoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 70,
  },

  titleContainer: {
    alignItems: "center",
    marginVertical: 20,
  },

  titleContent: {
    width: "100%",
    fontSize: 28,
    fontWeight: "700",
    textTransform: "uppercase",
    textAlign: "center",
    color: "coral",
  },

  itemsListContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  offersContainer: {
    width: 350,
    marginHorizontal: 20,
    height: 200,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#BFBFBF",
    borderRadius: 8,
    overflow: "hidden",
  },

  offersImageContainer: {
    width: "100%",
  },

  offersImage: {
    width: "100%",
    height: 130,
  },

  offerTitleContainer: {
    width: "100%",
    height: 30,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  offerTitleContent: {
    fontSize: 18,
    fontWeight: "bold",
  },

  offerDetailsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginTop: 5,
  },

  offerPrice: {
    flexDirection: "row",
    alignItems: "center",
  },

  offerPriceContent: {
    color: "#BFBFBF",
  },

  offerLocation: {
    flexDirection: "row",
    alignItems: "center",
  },

  offerLocationContent: {
    color: "#BFBFBF",
    marginLeft: 10,
  },
});
