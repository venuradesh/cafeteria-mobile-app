import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";

//components
import AdminHome from "../Screens/AdminHome";
import AddItems from "../Screens/AddItems";
import AdminOrders from "../Screens/AdminOrders";
import AdminHeader from "./AdminHeader";

const Tabs = createBottomTabNavigator();

const AdminBottomBarNav = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let tabBarIcon;

          if (route.name === "adminHome") {
            tabBarIcon = focused ? <MaterialIcons name="home" size={24} color="coral" /> : <MaterialIcons name="home-filled" size={24} color="coral" />;
          } else if (route.name === "addFood") {
            tabBarIcon = focused ? <MaterialIcons name="add" size={24} color="coral" /> : <MaterialIcons name="add" size={24} color="coral" />;
          } else if (route.name === "myorders") {
            tabBarIcon = focused ? <MaterialIcons name="border-all" size={24} color="coral" /> : <MaterialIcons name="border-all" size={24} color="coral" />;
          }

          return tabBarIcon;
        },

        tabBarActiveTintColor: "coral",
        tabBarInactiveTintColor: "#BFBFBF",
      })}
    >
      <Tabs.Screen name="adminHome" options={{ header: () => <AdminHeader />, title: "Caterer Home" }} component={AdminHome} />
      <Tabs.Screen name="addFood" options={{ header: () => <AdminHeader />, title: "Add Items" }} component={AddItems} />
      <Tabs.Screen name="myorders" options={{ header: () => <AdminHeader />, title: "Orders" }} component={AdminOrders} />
    </Tabs.Navigator>
  );
};

export default AdminBottomBarNav;

const styles = StyleSheet.create({});
