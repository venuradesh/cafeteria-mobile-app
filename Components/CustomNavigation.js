//dependencies
import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

//components
import Home from "../Screens/Home";
import Search from "../Screens/Search";
import MyOrders from "../Screens/MyOrders";
import Header from "./Header";
import Notifiations from "../Screens/Notifiations";

const Tabs = createBottomTabNavigator();

const CustomNavigation = ({ navigation }) => {
  const route = useRoute();
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let tabBarIcon;

          if (route.name === "home") {
            tabBarIcon = focused ? <MaterialIcons name="home" size={24} color="coral" /> : <MaterialIcons name="home-filled" size={24} color="coral" />;
          } else if (route.name === "search") {
            tabBarIcon = focused ? <MaterialIcons name="search" size={24} color="coral" /> : <MaterialIcons name="search" size={24} color="coral" />;
          } else if (route.name === "MyOrders") {
            tabBarIcon = focused ? <MaterialIcons name="border-all" size={24} color="coral" /> : <MaterialIcons name="border-all" size={24} color="coral" />;
          } else if (route.name === "notifications") {
            tabBarIcon = focused ? <MaterialIcons name="notifications" size={24} color="coral" /> : <MaterialIcons name="notifications" size={24} color="coral" />;
          }

          return tabBarIcon;
        },

        tabBarActiveTintColor: "coral",
        tabBarInactiveTintColor: "#BFBFBF",
      })}
    >
      <Tabs.Screen name="home" component={Home} initialParams={{ params: route.params }} options={{ header: () => <Header />, title: "Home" }} />
      <Tabs.Screen name="search" component={Search} initialParams={{ params: route.params }} options={{ header: () => <Header />, title: "Search" }} />
      <Tabs.Screen name="MyOrders" component={MyOrders} initialParams={{ params: route.params }} options={{ header: () => <Header />, title: "MyOrders" }} />
      <Tabs.Screen name="notifications" component={Notifiations} initialParams={{ params: route.params }} options={{ header: () => <Header />, title: "Notifications" }} />
    </Tabs.Navigator>
  );
};

export default CustomNavigation;

const styles = StyleSheet.create({});
