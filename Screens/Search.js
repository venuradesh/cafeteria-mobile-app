import { FlatList, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";

//global styles
import globalStyles from "../Globals/globalStyles";
import { MaterialIcons } from "@expo/vector-icons";

const Search = () => {
  const dataList = [
    { name: "Fried rice", image: { uri: "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg" }, venue: "Main canteen", price: "200" },
    { name: "Fried rice", image: { uri: "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg" }, venue: "Main canteen", price: "200" },
    { name: "Fried rice", image: { uri: "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg" }, venue: "Main canteen", price: "200" },
    { name: "Fried rice", image: { uri: "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg" }, venue: "Main canteen", price: "200" },
  ];

  const onSearchPress = () => {};

  const onItemClick = () => {};

  return (
    <View styles={[globalStyles.container, styles.container]}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleContent}>Saerch Food By Name</Text>
      </View>
      <View style={styles.searchItems}>
        <TextInput placeholder="Search Order" style={styles.search} />
        <Pressable onPress={onSearchPress} style={styles.searchBtn}>
          <Text style={styles.searchBtnContent}>Search</Text>
        </Pressable>
      </View>
      <View style={styles.searchItemContainer}>
        <FlatList
          data={dataList}
          horizontal={false}
          renderItem={({ item }) => {
            return (
              <Pressable style={styles.itemContainer} onPress={() => onItemClick(item)}>
                <View style={styles.itemImageContainer}>
                  <Image style={styles.itemImage} source={item.image} />
                </View>
                <View style={styles.itemTitleContainer}>
                  <Text style={styles.itemTitleContent}>{item.name}</Text>
                </View>
                <View style={styles.itemDetailsContainer}>
                  <View style={styles.itemPrice}>
                    <Text style={styles.itemPriceContent}>Rs.{item.price}/-</Text>
                  </View>
                  <View style={styles.itemLocation}>
                    <MaterialIcons name="location-pin" size={24} color="#BFBFBF" />
                    <Text style={styles.itemLocationContent}>{item.venue}</Text>
                  </View>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },

  titleContent: {
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "900",
    textTransform: "capitalize",
    color: "coral",
  },

  searchItems: {
    paddingHorizontal: 20,
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

  searchItemContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  itemContainer: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    overflow: "hidden",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    marginBottom: 20,
    paddingBottom: 20,
  },

  itemImageContainer: {
    width: "100%",
  },

  itemImage: {
    width: "100%",
    height: 120,
  },

  itemTitleContainer: {
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  itemTitleContent: {
    width: "100%",
    fontSize: 20,
    color: "coral",
    fontWeight: "800",
    textTransform: "uppercase",
  },

  itemDetailsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },

  itemPrice: {
    flex: 1,
    justifyContent: "center",
  },

  itemPriceContent: {
    fontSize: 20,
    fontWeight: "800",
    color: "#bfbfbf",
  },

  itemLocation: {
    flexDirection: "row",
    alignItems: "center",
  },

  itemLocationContent: {
    marginLeft: 15,
    fontSize: 16,
    color: "#bfbfbf",
  },
});
