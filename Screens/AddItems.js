import { StyleSheet, Text, View, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";

//components
import globalStyles from "../Globals/globalStyles";

const AddItems = () => {
  const [breakfast, setBreakFast] = useState(true);
  const [lunch, setLunch] = useState(false);
  const [dinner, setDinner] = useState(false);
  const [foodItemName, setFoodItemName] = useState("");
  const [price, setPrice] = useState("");

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

  const checkLogin = () => {};

  const ItemList = ["Fried Rice", "Rice and Curry", "Short Eats"];

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
          <TextInput style={styles.input} onChangeText={(val) => setFoodItemName(val)} />
        </View>
        <View style={styles.inputItem}>
          <Text style={styles.inputTextContent}>Price (Rs.)</Text>
          <TextInput style={styles.input} onChangeText={(val) => setPrice(val)} />
        </View>
      </View>
      <View style={styles.dropdown}>
        <Text style={[styles.inputTextContent, styles.dropDownItem]}>Select Item Type</Text>
        <SelectDropdown
          data={ItemList}
          onSelect={(selectedItem, index) => {
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
      <View style={[styles.btnContainer, styles.submitBtnContainer]}>
        <Pressable style={[styles.btn, styles.btnSubmit]} onPress={checkLogin}>
          <Text style={styles.btnContent}>Submit</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnReset]}>
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
