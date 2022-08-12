import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

const drawer = createDrawerNavigator();

import React from "react";
import Logout from "../Screens/Logout";
import Settings from "../Screens/Settings";
import CustomDrawer from "./CustomDrawer";
import CustomNavigation from "./CustomNavigation";

const Drawer = () => {
  return (
    <drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerLabelStyle: { marginLeft: -20, fontWeight: "700" },
        drawerActiveBackgroundColor: "coral",
        drawerActiveTintColor: "white",
        drawerActiveTintColor: "black",
      }}
    >
      <drawer.Screen name="home" component={CustomNavigation} options={{ headerShown: false, title: "Home", drawerIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} /> }} />
      <drawer.Screen name="settings" component={Settings} options={{ drawerIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} /> }} />
      <drawer.Screen name="Logout" component={Logout} options={{ drawerIcon: ({ color }) => <MaterialIcons name="logout" size={24} color={color} /> }} />
    </drawer.Navigator>
  );
};

export default Drawer;