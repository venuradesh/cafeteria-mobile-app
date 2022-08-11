import React, { useState } from "react";
import { View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//components
import StartPage from "./Screens/StartPage";
import SignUpPage from "./Screens/SignUpPage";
import LoginPage from "./Screens/LoginPage";
import Home from "./Screens/Home";
import Header from "./Components/Header";

//global style components
import globalStyles from "./Globals/globalStyles";
import Tabs from "./Components/Tabs";
import CustomNavigation from "./Components/CustomNavigation";

const getFont = () => {
  return Font.loadAsync({
    "poppins-bold": require("./assets/Fonts/Poppins-Bold.ttf"),
    "poppins-extra-light": require("./assets/Fonts/Poppins-ExtraLight.ttf"),
    "poppins-regular": require("./assets/Fonts/Poppins-Regular.ttf"),
  });
};

const stack = createNativeStackNavigator();

export default function App() {
  const [fonts, setFonts] = useState(false);

  if (fonts) {
    return (
      <View style={[globalStyles.container]}>
        <NavigationContainer style={[globalStyles.container]}>
          <stack.Navigator>
            <stack.Screen name="start" component={StartPage} options={{ headerShown: false }} />
            <stack.Screen name="signup" component={SignUpPage} options={{ title: "Create Account" }} />
            <stack.Screen name="login" component={LoginPage} options={{ title: "Login" }} />
            <stack.Screen name="home" component={CustomNavigation} options={{ headerShown: false }} />
          </stack.Navigator>
        </NavigationContainer>
      </View>
    );
  } else {
    return <AppLoading startAsync={getFont} onFinish={() => setFonts(true)} onError="" />;
  }
}
