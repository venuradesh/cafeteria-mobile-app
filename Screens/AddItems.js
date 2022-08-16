import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { collection, addDoc, getDocs, onSnapshot, query, where, doc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

//components
import globalStyles from "../Globals/globalStyles";

const AddItems = () => {
  const [breakfast, setBreakFast] = useState(true);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [foodItemName, setFoodItemName] = useState("");
  const [price, setPrice] = useState("");
  const [foodType, setFoodType] = useState("");
  const [venue, setVenue] = useState("");

  const onBreakFastClick = () => {
    setBreakFast(true);
    setLunch(false);
    setDinner(false);
  };
  const onLunchClick = () => {
    setBreakFast(false);
    setLunch(true);
    setDinner(false);
  };
  const onDinnerClick = () => {
    setBreakFast(false);
    setLunch(false);
    setDinner(true);
  };

  const addItem = () => {
    var link = "";
    var mealsTime = "";

    if (breakfast) {
      mealsTime = "breakfast";
    } else if (lunch) {
      mealsTime = "lunch";
    } else {
      mealsTime = "dinner";
    }

    if (foodType == "Fried Rice") {
      link = "https://therecipecritic.com/wp-content/uploads/2019/07/easy_fried_rice-1-500x500.jpg";
    } else if (foodType == "Rice and Curry") {
      link = "https://images.unsplash.com/photo-1617651523904-8768096faf40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZSUyMGFuZCUyMGN1cnJ5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
    }
    if (foodType == "Short Eats") {
      link = "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHNuYWNrc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
    } else {
      link = "https://images.unsplash.com/photo-1497534446932-c925b458314e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGp1aWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
    }

    const ref = doc(collection(db, "foods"));
    const docRef = addDoc(collection(db, "foods"), {
      name: foodItemName,
      time: Date.now(),
      mealsTime: mealsTime,
      price: price,
      foodType: foodType,
      key: ref.id,
      image: { uri: link },
      venue: venue,
    });

    console.log("Document written with ID: ", docRef.id);
    clear();
  };

  const clear = () => {
    setFoodItemName("");
    setPrice("");
  };

  const ItemList = ["Fried Rice", "Rice and Curry", "Short Eats", "Juice"];
  const venueList = [global.canteen];

  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.btnContainer}>
        <Pressable onPress={onBreakFastClick} style={!breakfast ? [styles.btn] : [styles.btn, styles.btnClicked]}>
          <Text style={styles.btnContent}>Breakfast</Text>
        </Pressable>
        <Pressable onPress={onLunchClick} style={!lunch ? [styles.btn] : [styles.btn, styles.btnClicked]}>
          <Text style={styles.btnContent}>Lunch</Text>
        </Pressable>
        <Pressable onPress={onDinnerClick} style={!dinner ? [styles.btn] : [styles.btn, styles.btnClicked]}>
          <Text style={styles.btnContent}>Dinner</Text>
        </Pressable>
      </View>
      <View style={styles.inputItemsContainer}>
        <View style={styles.inputItem}>
          <Text style={styles.inputTextContent}>Food Item Name</Text>
          <TextInput style={styles.input} onChangeText={(val) => setFoodItemName(val)} value={foodItemName} />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputTextContent}>Price (Rs.)</Text>
          <TextInput style={styles.input} onChangeText={(val) => setPrice(val)} value={price} />
        </View>
      </View>
      <View style={styles.dropdown}>
        <Text style={[styles.inputTextContent, styles.dropDownItem]}>Select Item Type</Text>
        <SelectDropdown
          data={ItemList}
          onSelect={(selectedItem, index) => {
            setFoodType(selectedItem);
            console.log(selectedItem);
          }}
          buttonStyle={{
            width: 200,
            height: 50,
          }}
          buttonTextStyle={{
            fontSize: 16,
            color: "#bfbfbf",
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          defaultButtonText="Select the food"
        />
      </View>
      <View style={styles.dropdown}>
        <Text style={[styles.inputTextContent, styles.dropDownItem]}>Select Venue</Text>
        <SelectDropdown
          data={venueList}
          onSelect={(selectedVenue, index) => {
            setVenue(selectedVenue);
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
          defaultButtonText={venueList[0]}
        />
      </View>
      <View style={[styles.btnContainer, styles.submitBtnContainer]}>
        <Pressable style={[styles.btn, styles.btnSubmit]} onPress={addItem}>
          <Text style={styles.btnContent}>Submit</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnReset]} onPress={clear}>
          <Text style={styles.btnContent}>Reset</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddItems;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginBottom: 20,
  },

  btn: {
    width: 110,
    height: 50,
    backgroundColor: "#BFBFBF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 0,
  },

  btnContent: {
    color: "white",
  },

  btnClicked: {
    backgroundColor: "coral",
  },

  inputItem: {
    marginTop: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#BFBFBF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 5,
  },

  inputTextContent: {
    color: "#999999",
    marginLeft: 10,
  },

  inputItemsContainer: {
    paddingHorizontal: 20,
  },

  dropdown: {
    marginVertical: 20,
    paddingHorizontal: 20,
  },

  dropDownItem: {
    marginBottom: 10,
  },

  submitBtnContainer: {
    justifyContent: "space-around",
    paddingHorizontal: 50,
    paddingLeft: 20,
  },
});
