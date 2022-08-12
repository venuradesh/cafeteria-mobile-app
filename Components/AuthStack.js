import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//screens
import StartPage from "../Screens/StartPage";
import SignUpPage from "../Screens/SignUpPage";
import LoginPage from "../Screens/LoginPage";

const stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <stack.Navigator initialRouteName="start">
      <stack.Screen name="start" component={StartPage} options={{ headerShown: false }} />
      <stack.Screen name="signup" component={SignUpPage} options={{ title: "Create Account" }} />
      <stack.Screen name="login" component={LoginPage} options={{ title: "Login" }} />
    </stack.Navigator>
  );
};

export default AuthStack;
