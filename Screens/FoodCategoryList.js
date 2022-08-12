import { StyleSheet, Text, View, FlatList, Image, Pressable, SafeAreaView } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

//components
import globalStyles from "../Globals/globalStyles";

const FoodCategoryList = ({ route, navigation }) => {
  const onItemClick = (itemDetails) => {
    navigation.navigate("itemDes", { itemDetails });
  };

  const dataList = [
    { name: "Fried Rice", key: "1", price: "Rs 200/-", venue: "Main Canteen", image: { uri: "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg" }, desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." },
    { name: "Fast Food", key: "2", price: "Rs 150/-", venue: "Shiwa Canteen", image: { uri: "https://www.unileverfoodsolutions.lk/dam/global-ufs/mcos/meps/sri-lanka/calcmenu/recipes/LK-recipes/general/chicken-fried-rice/main-header.jpg" }, desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." },
    { name: "Mega rice", key: "3", price: "Rs 400/-", venue: "Main canteen", image: { uri: "https://redhousespice.com/wp-content/uploads/2022/03/chinese-pork-fried-rice-1-scaled.jpg" }, desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." },
    { name: "Chilli Rice", key: "4", price: "Rs 250/-", venue: "Shawarma", image: { uri: "https://static.toiimg.com/thumb/53991927.cms?width=1200&height=900" }, desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged." },
  ];

  return (
    <SafeAreaView style={[globalStyles.container, styles.container]}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleContent}>{route.params.itemName}</Text>
      </View>
      <View style={styles.itemsListContainer}>
        <FlatList
          data={dataList}
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
