import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

const CustomDrawer = (props) => {
  return (
    <View style={styles.drawerContainer}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#E6E6E6",
  },
});
