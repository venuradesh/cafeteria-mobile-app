import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, TextInput, View, KeyboardAvoidingView } from "react-native";
import { collection, addDoc , getDocs, onSnapshot , query, where , doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";


const ItemDes = () => {
  const [orderClick, setOrderClick] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [hostel, setHostel] = useState("");
  const [err, setError] = useState(false);
  const navigation=useNavigation();
  const route=useRoute();
  const venueList=["Boys Hostel","Sarasavi Girls","New Sarasavi Girls","Nilaweli Boys ","Marbel Girls"];
  const mealsTime="breakfast";
  const orderNow =async () => {
    try{
      const userid=route.params.userid;
      const ref = doc(collection(db,"orders"));
      const docRef = await addDoc(collection(db, "orders"), {
        itemName: route.params.itemDetails.name,
        itemId: route.params.itemDetails.key,
        hostel: hostel,
        quantity: quantity,
        status:'Pending' , 
        orderId:ref.id,
        image:route.params.itemDetails.image,
        total:quantity*route.params.itemDetails.price,
        userid:userid,
        userName:global.userName,
        mealsTime:mealsTime
      });
      navigation.navigate("MyOrders", { userid });
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }
    
  };

  return (
    <View>
      <View style={styles.coverContainer}>
        <Image source={route.params.itemDetails.image} style={styles.coverImage} />
      </View>
      <View style={styles.itemTitle}>
        <Text style={styles.itemName}>{route.params.itemDetails.name}</Text>
      </View>
      <View style={styles.itemDesc}>
        <Text style={styles.itemDes}>You can Buy this food at {route.params.itemDetails.venue}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>Rs.{route.params.itemDetails.price}/-</Text>
      </View>
      <View style={styles.btnContainer}>
        <Pressable style={styles.btn} onPress={() => setOrderClick(true)}>
          <Text style={styles.orderContent}>Place an Order</Text>
        </Pressable>
      </View>
      {orderClick ? (
        <View style={styles.orderNowContainer}>
          <View style={styles.quantity}>
            <Text style={styles.inputTextContent}>Quantity</Text>
            <TextInput style={styles.input} onChangeText={(val) => {setQuantity(val)}} />
            {/* {err ? (
              <View>
                <Text style={styles.inputError}>Only Numbers are allowed</Text>
              </View>
            ) : (
              <View></View>
            )} */}
          </View>
          {/* <KeyboardAvoidingView style={styles.address}> */}
          <View style={styles.dropdown}>
          <Text style={[styles.inputTextContent, styles.dropDownItem]}>Select Hostel</Text>
          <SelectDropdown
            data={venueList}
            onSelect={(selectedVenue, index) => {
              setHostel(selectedVenue);
              console.log(selectedVenue);
            }}
            buttonStyle={{
              width: 200,
              height: 50,
            }}
            buttonTextStyle={{
              fontSize: 16,
              color: "#bfbfbf",
            }}
            buttonTextAfterSelection={(selectedVenue, index) => {
              return selectedVenue;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            defaultButtonText="Select the Hostel"
          />
          </View>
          {/* </KeyboardAvoidingView> */}
          <KeyboardAvoidingView style={[styles.btnContainer, styles.btnContainerOrderNow]}>
            <Pressable style={[styles.btn, styles.orderBtn]} onPress={() => orderNow()}>
              <Text style={[styles.orderContent, styles.orderNow]}>Order Now</Text>
            </Pressable>
          </KeyboardAvoidingView>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default ItemDes;

const styles = StyleSheet.create({
  coverContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "red",
  },

  coverImage: {
    width: "100%",
    height: "100%",
  },

  itemTitle: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  itemName: {
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "700",
    textTransform: "uppercase",
    color: "coral",
  },

  itemDesc: {
    paddingHorizontal: 30,
    marginBottom: 20,
    marginTop: 10,
  },

  itemDes: {
    width: "100%",
    textAlign: "center",
    lineHeight: 20,
  },

  priceContainer: {
    paddingHorizontal: 30,
    marginBottom: 30,
    width: "100%",
  },

  price: {
    fontSize: 24,
    color: "#bfbfbf",
    textAlign: "center",
  },

  btnContainer: {
    paddingHorizontal: 30,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  btn: {
    width: 200,
    height: 50,
    backgroundColor: "coral",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  orderContent: {
    width: "100%",
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  orderNowContainer: {
    paddingHorizontal: 30,
  },

  inputTextContent: {
    color: "#999999",
    marginLeft: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#BFBFBF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 5,
  },

  quantity: {
    marginTop: 20,
  },

  address: {
    marginTop: 20,
  },

  btnContainerOrderNow: {
    marginTop: 20,
  },

  orderBtn: {
    backgroundColor: "#F63743",
  },

  orderNow: {
    fontSize: 18,
  },

  inputError: {},
});
