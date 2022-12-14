//dependencies
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, Image, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import SelectDropdown from "react-native-select-dropdown";

//components
import globalStyles from "../Globals/globalStyles";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [deliveryClick, setDeliveryClick] = useState(true);
  const [pickupClick, setPickupClick] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [min, setMin] = useState(59);
  const [sec, setSec] = useState(59);

  const mealTimeList = ["breakfast", "dinner", "lunch"];

  useEffect(() => {
    const timer = setInterval(() => {
      setSec(sec - 1);

      if (sec === 1) {
        setMin(min - 1);
        setSec(59);
      }

      if (min === 0 && sec === 1) {
        clearTimeout();
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  });

  const categoryData = [
    {
      title: "Rice and Curry",
      name: "Rice and Curry",
      key: "1",
      activeStatus: "active",
      image: { uri: "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/07/Starbucks_Food_Spinach_Feta_Wrap-1296x728-header.jpg?w=1155&h=1528" },
    },
    {
      title: "Fried Rice",
      key: "2",
      name: "Fried Rice",
      activeStatus: "",
      image: { uri: "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg" },
    },
    {
      title: "Short Eats",
      key: "3",
      name: "Short Eats",
      activeStatus: "",
      image: { uri: "https://static.showit.co/800/D0xOCAJuS2-072g0uUIOyQ/shared/mutton_rolls.jpg" },
    },
    {
      title: "Juice",
      key: "4",
      name: "Juice",
      activeStatus: "",
      image: { uri: "https://media.istockphoto.com/photos/orange-juice-splash-picture-id537837754?k=20&m=537837754&s=612x612&w=0&h=D69GxC3Mlw--eqvtIk7kBTjC6tqG-dWdcvRl5Aoq49w=" },
    },
  ];

  const offerItems = [
    {
      title: "Main Canteen",
      key: "1",
      time: "5 min",
      venue: "Main canteen Ground floor",
      image: { uri: "https://cdn.shopify.com/s/files/1/1762/3971/files/masm.jpg?v=1654761479&width=1500" },
    },
    {
      title: "Swarna Stores",
      key: "2",
      time: "10min",
      venue: "outside",
      image: { uri: "https://cdn.shopify.com/s/files/1/1762/3971/files/masm.jpg?v=1654761479&width=1500" },
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

  const onItemClick = (itemName) => {
    const userid = route.params.params.params.userid;
    navigation.navigate("foodCategory", { itemName, userid });
  };

  return (
    <ScrollView style={[globalStyles.container, styles.container]}>
      <View style={styles.locationContainer}>
        <Pressable style={styles.location} onPress={onLocation}>
          <View style={styles.locationContent}>
            <MaterialIcons name="location-pin" size={24} color="#595959" />
            <Text style={styles.locationText}>{global.hostel}</Text>
          </View>
          <Pressable style={styles.time} onPress={onTime}>
            {/* <MaterialIcons name="access-time" size={24} color="#595959" /> */}
            <View style={styles.dropdown}>
              {/* <Text style={[styles.inputTextContent, styles.dropDownItem]}>Time</Text> */}
              <SelectDropdown
                data={mealTimeList}
                onSelect={(selectedVenue, index) => {
                  global.mealTime = selectedVenue;
                }}
                buttonStyle={{
                  width: 100,
                  height: 25,
                  borderRadius: 8,
                  backgroundColor: "white",
                  position: "relative",
                  right: 90,
                  bottom: 10,
                }}
                buttonTextStyle={{
                  width: "100%",
                  fontSize: 12,
                  color: "black",
                  textAlign: "center",
                }}
                buttonTextAfterSelection={(selectedVenue, index) => {
                  return selectedVenue;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
                defaultButtonText="Time"
              />
            </View>
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
            <Pressable style={styles.categoryItem} onPress={() => onItemClick(item.name)}>
              <Image source={item.image} style={styles.itemImage} />
              <Text style={styles.itemText}>{item.title}</Text>
            </Pressable>
          )}
        />
      </View>
      <View style={styles.titleStrip}>
        <Text style={styles.stripText}>Free Delivery Now</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeOption}>Option Changes in </Text>
        <View style={styles.minContainer}>
          <Text style={styles.number}>{min}</Text>
          <Text style={styles.minIndicator}>min</Text>
        </View>
        <View style={styles.minContainer}>
          <Text style={styles.number}>{sec}</Text>
          <Text style={styles.minIndicator}>sec</Text>
        </View>
      </View>
      <FlatList
        data={offerItems}
        horizontal={true}
        renderItem={({ item }) => {
          return (
            <View style={styles.offersContainer}>
              <View style={styles.offersImageContainer}>
                <Image style={styles.offersImage} source={item.image} />
              </View>
              <View style={styles.offerTitleContainer}>
                <Text style={styles.offerTitleContent}>{item.title}</Text>
              </View>
              <View style={styles.offerDetailsContainer}>
                <View style={styles.offerTime}>
                  <Text style={styles.offerTimeContent}>{item.time}</Text>
                </View>
                <View style={styles.offerLocation}>
                  <MaterialIcons name="location-pin" size={24} color="#BFBFBF" />
                  <Text style={styles.offerLocationContent}>{item.venue}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
  },

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
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#E6E6E6",
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    borderRadius: 8,
    marginRight: 10,
  },

  locationContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationText: {
    marginLeft: 10,
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
    width: "100%",
    marginTop: 10,
    textAlign: "center",
    fontSize: 12,
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

  offersContainer: {
    width: 300,
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

  offerTime: {
    flexDirection: "row",
    alignItems: "center",
  },

  offerTimeContent: {
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
  dropdown: {
    width: 10,
    height: 5,
  },

  dropDownItem: {
    marginBottom: 2,
  },
});
