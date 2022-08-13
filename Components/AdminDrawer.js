import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

//components
import Logout from "../Screens/Logout";
import AdminBottomBarNav from "./AdminBottomBarNav";
import CustomDrawer from "./CustomDrawer";

const drawer = createDrawerNavigator();

const AdminDrawer = () => {
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
      <drawer.Screen name="adminHome" component={AdminBottomBarNav} options={{ headerShown: false, title: "Home", drawerIcon: ({ color }) => <MaterialIcons name="home" size={24} color={color} /> }} />
      <drawer.Screen name="Logout" component={Logout} options={{ drawerIcon: ({ color }) => <MaterialIcons name="logout" size={24} color={color} /> }} />
    </drawer.Navigator>
  );
};

export default AdminDrawer;
