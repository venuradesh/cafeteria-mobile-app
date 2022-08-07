import { StyleSheet, Text, View } from "react-native";
import React from "react";
import globalStyles from "../Globals/globalStyles";

const LoginPage = () => {
  return (
    <View style={[globalStyles.container, styles.container]}>
      <Text>LoginPage</Text>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
});
