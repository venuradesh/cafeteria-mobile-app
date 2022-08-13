import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const drawer = createDrawerNavigator();

import React from "react";
import Logout from "../Screens/Logout";
import CustomDrawer from "./CustomDrawer";
import CustomNavigation from "./CustomNavigation";

const Drawer = () => {
  const route=useRoute();
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
      <drawer.Screen name="home" component={CustomNavigation} initialParams={{params:route.params}} options={{ headerShown: false, title: "Home", drawerIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} /> }} />
      <drawer.Screen name="Logout" component={Logout} options={{ drawerIcon: ({ color }) => <MaterialIcons name="logout" size={24} color={color} /> }} />
    </drawer.Navigator>
  );
};

export default Drawer;
