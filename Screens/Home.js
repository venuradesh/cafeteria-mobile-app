//dependencies
import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Image, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

//components
import globalStyles from "../Globals/globalStyles";

const Home = () => {
  const [deliveryClick, setDeliveryClick] = useState(true);
  const [pickupClick, setPickupClick] = useState(false);
  const categoryData = [
    { title: "Fast Food", key: "1", activeStatus: "active", image: { uri: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/07/Starbucks_Food_Spinach_Feta_Wrap-1296x728-header.jpg?w=1155&h=1528" } },
    {
      title: "Fried Rice",
      key: "2",
      activeStatus: "",
      image: { uri: "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg" },
    },
    {
      title: "Short Eats",
      key: "3",
      activeStatus: "",
      image: { uri: "https://static.showit.co/800/D0xOCAJuS2-072g0uUIOyQ/shared/mutton_rolls.jpg" },
    },
    {
      title: "Juice",
      key: "4",
      activeStatus: "",
      image: { uri: "https://media.istockphoto.com/photos/orange-juice-splash-picture-id537837754?k=20&m=537837754&s=612x612&w=0&h=D69GxC3Mlw--eqvtIk7kBTjC6tqG-dWdcvRl5Aoq49w=" },
    },
  ];

  const onDelivery = () => {
    setDeliveryClick(true);
    setPickupClick(false);
  };
  const onPickup = () => {
    setPickupClick(true);
    setDeliveryClick(false);
  };

  const onLocation = () => {};

  const onTime = () => {};

  return (
    <ScrollView style={[globalStyles.container, styles.container]}>
      <View style={styles.btnContainer}>
        <Pressable onPress={onDelivery} style={deliveryClick ? [styles.btnClicked, styles.btn] : [styles.btn, styles.delivery]}>
          <Text style={styles.btnText}>Delivery</Text>
        </Pressable>
        <Pressable onPress={onPickup} style={pickupClick ? [styles.btnClicked, styles.btn] : [styles.btn, styles.pickup]}>
          <Text style={styles.btnText}>Pick up</Text>
        </Pressable>
      </View>
      <View style={styles.locationContainer}>
        <Pressable style={styles.location} onPress={onLocation}>
          <MaterialIcons name="location-pin" size={24} color="#595959" />
          <Text style={styles.locationText}>Nilaweli Hostel</Text>
          <Pressable style={styles.time} onPress={onTime}>
            <MaterialIcons name="access-time" size={24} color="#595959" />
            <Text style={styles.timeText}>Now</Text>
          </Pressable>
        </Pressable>
        <Entypo name="sound-mix" size={24} color="#595959" />
      </View>
      <View style={styles.titleStrip}>
        <Text style={styles.stripText}>Categories</Text>
      </View>
      <View style={styles.categorySection}>
        <FlatList
          data={categoryData}
          horizontal={true}
          renderItem={({ item }) => (
            <View style={styles.categoryItem}>
              <Image source={item.image} style={styles.itemImage} />
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.titleStrip}>
        <Text style={styles.stripText}>Free Delivery Now</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeOption}>Option Changes in </Text>
        <View style={styles.minContainer}>
          <Text style={styles.number}>56</Text>
          <Text style={styles.minIndicator}>min</Text>
        </View>
        <View style={styles.minContainer}>
          <Text style={styles.number}>51</Text>
          <Text style={styles.minIndicator}>sec</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},

  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },

  btn: {
    width: 120,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  btnClicked: {
    backgroundColor: "coral",
  },

  delivery: {
    backgroundColor: "#BFBFBF",
  },

  pickup: {
    backgroundColor: "#BFBFBF",
  },

  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  locationContainer: {
    width: 350,
    height: 50,
    backgroundColor: "#BFBFBF",
    justifyContent: "space-between",
    paddingRight: 30,
    paddingLeft: 5,
    alignItems: "center",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 8,
    marginBottom: 20,
  },

  location: {
    flexDirection: "row",
    backgroundColor: "#E6E6E6",
    paddingVertical: 5,
    alignItems: "center",
    paddingHorizontal: 5,
    borderRadius: 8,
    flex: 1,
    marginRight: 20,
  },

  locationText: {
    marginLeft: 10,
    fontSize: 16,
  },

  time: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: "auto",
    fontSize: 16,
  },

  timeText: {
    marginLeft: 5,
  },

  titleStrip: {
    width: "100%",
    height: 45,
    backgroundColor: "#BFBFBF",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  stripText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  categorySection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  categoryItem: {
    marginRight: 20,
    backgroundColor: "#BFBFBF",
    padding: 10,
    borderRadius: 8,
  },

  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },

  itemText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  timeOption: {
    marginHorizontal: 20,
    fontSize: 20,
    fontWeight: "700",
  },

  minContainer: {
    backgroundColor: "coral",
    width: 60,
    height: 60,
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  number: {
    fontSize: 28,
    fontWeight: "700",
  },

  minIndicator: {
    fontSize: 10,
  },
});