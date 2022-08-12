import { StyleSheet, Text, View } from "react-native";
import React from "react";
import globalStyles from "../Globals/globalStyles";

const MyOrders = () => {
  return (
    <View style={[globalStyles.container, styles.container]}>
      <View style={styles.pendingCountContainer}>
        <View style={styles.pendingCount}>
          <Text style={styles.pendingCountContent}>Pending Orders: 5</Text>
        </View>
      </View>
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({});
