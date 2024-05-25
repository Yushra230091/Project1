import React from "react";
import { StyleSheet, View, } from "react-native";
import App from "./Home";


export default function Index() {
  return (
    <View style={styles.container}>


      <App ></App>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
