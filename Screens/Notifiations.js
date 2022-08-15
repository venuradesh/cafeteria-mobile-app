import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

//global styling
import globalStyles from "../Globals/globalStyles";

const Notifiations = () => {
  const dataList = [
    { itemName: "Fried Rice", quantity: "4", totalPrice: "800" },
    { itemName: "Fried Rice", quantity: "4", totalPrice: "800" },
    { itemName: "Fried Rice", quantity: "4", totalPrice: "800" },
    { itemName: "Fried Rice", quantity: "4", totalPrice: "800" },
    { itemName: "Fried Rice", quantity: "4", totalPrice: "800" },
    { itemName: "Fried Rice", quantity: "4", totalPrice: "800" },
    { itemName: "Fried Rice", quantity: "4", totalPrice: "800" },
    { itemName: "Fried Rice", quantity: "4", totalPrice: "800" },
    { itemName: "Fried Rice", quantity: "4", totalPrice: "800" },
  ];

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.listContainer}>
        <FlatList
          data={dataList}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View style={styles.itemTitle}>
                <Text style={styles.itemTitleContent}>Order Arrived!</Text>
              </View>
              <View style={styles.itemNameQtyContainer}>
                <Text style={styles.itemName}>{item.itemName}</Text>
                <Text style={styles.quantity}>Qty: {item.quantity}</Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>
                  <Text style={styles.span}>Your Total Pay: </Text> Rs. {item.totalPrice}/-
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default Notifiations;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  listContainer: {
    width: "100%",
  },

  item: {
    borderColor: "#bfbfbf",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    width: "100%",
  },

  itemTitle: {
    marginBottom: 5,
  },

  itemTitleContent: {
    color: "coral",
    fontSize: 20,
    fontWeight: "800",
  },

  itemNameQtyContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  itemName: {
    width: "50%",
    fontSize: 16,
    fontWeight: "800",
    color: "#bfbfbf",
  },

  quantity: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    color: "#bfbfbf",
  },

  priceContainer: {
    width: "100%",
    height: 30,
    justifyContent: "center",
  },

  price: {
    fontSize: 20,
  },

  span: {
    color: "#bfbfbf",
    fontSize: 12,
  },
});
