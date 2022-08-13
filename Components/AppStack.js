import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//drawer
import Drawer from "./Drawer";
import AuthStack from "./AuthStack";
import FoodCategoryList from "../Screens/FoodCategoryList";
import ItemDes from "../Screens/ItemDes";
import AdminDrawer from "./AdminDrawer";


const stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen name="auth" component={AuthStack} options={{ headerShown: false }} />
      <stack.Screen name="home" component={Drawer} options={{ headerShown: false, title: "Client home" }} />
      <stack.Screen name="adminHome" component={AdminDrawer} options={{ headerShown: false }} />
      <stack.Screen
        name="foodCategory"
        component={FoodCategoryList}
        options={{
          title: "Food Category",
          headerStyle: {
            backgroundColor: "coral",
          },
        }}
      />
      <stack.Screen name="itemDes" component={ItemDes} options={{ title: "Item Description", headerStyle: { backgroundColor: "coral" } }} />
    </stack.Navigator>
  );
};

export default AppStack;
