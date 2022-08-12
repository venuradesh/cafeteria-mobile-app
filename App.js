import "react-native-gesture-handler";
import React, { useState } from "react";
import { View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

//global style components
import globalStyles from "./Globals/globalStyles";
import AppStack from "./Components/AppStack";

const getFont = () => {
  return Font.loadAsync({
    "poppins-bold": require("./assets/Fonts/Poppins-Bold.ttf"),
    "poppins-extra-light": require("./assets/Fonts/Poppins-ExtraLight.ttf"),
    "poppins-regular": require("./assets/Fonts/Poppins-Regular.ttf"),
  });
};

export default function App() {
  const [fonts, setFonts] = useState(false);

  if (fonts) {
    return (
      <View style={[globalStyles.container]}>
        <NavigationContainer style={[globalStyles.container]}>
          <AppStack />
        </NavigationContainer>
      </View>
    );
  } else {
    return <AppLoading startAsync={getFont} onFinish={() => setFonts(true)} onError="" />;
  }
}
