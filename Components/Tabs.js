//dependencies
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//components
import Home from "../Screens/Home";
import Search from "../Screens/Search";
import MyOrders from "../Screens/MyOrders";
import ProfileClient from "../Screens/ProfileClient";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="myorders" component={MyOrders} />
      <Tab.Screen name="profileClient" component={ProfileClient} />
    </Tab.Navigator>
  );
};

export default Tabs;
