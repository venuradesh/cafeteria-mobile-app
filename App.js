import "react-native-gesture-handler";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';


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

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 2 },
  });
}

export default function App() {
  const [fonts, setFonts] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
