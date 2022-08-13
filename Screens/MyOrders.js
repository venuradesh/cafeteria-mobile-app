import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import globalStyles from "../Globals/globalStyles";

const MyOrders = () => {
  const dataList = [
    { name: "Fried Rice", image: { uri: "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg" }, activeStatus: "pending", quantity: "2", totalPrice: "400" },
    { name: "Fried Rice", image: { uri: "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg" }, activeStatus: "pending", quantity: "2", totalPrice: "400" },
    { name: "Fried Rice", image: { uri: "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg" }, activeStatus: "pending", quantity: "2", totalPrice: "400" },
  ];

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={[styles.totalOrdersContainer, styles.boxWrapper]}>
        <View style={[styles.totalCount, styles.boxContainer]}>
          <Text style={[styles.totalCountContent, styles.boxContent]}>Total Orders: 5</Text>
        </View>
      </View>
      <View style={[styles.pendingCountContainer, styles.boxWrapper]}>
        <View style={[styles.pendingCount, styles.boxContainer]}>
          <Text style={[styles.pendingCountContent, styles.boxContent]}>Pending Orders: 3</Text>
        </View>
      </View>
      <Text style={styles.pendings}>Pendings</Text>
      <View style={styles.pendingListContainer}>
        <FlatList
          data={dataList}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={styles.contentContainer}>
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{item.name}</Text>
                </View>
                <View style={styles.quantityPriceContainer}>
                  <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                  <Text style={styles.price}>Total Price: Rs. {item.totalPrice}/-</Text>
                </View>
                <View style={styles.activeContainer}>
                  <Text style={styles.status}>Status: {item.activeStatus}</Text>
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
