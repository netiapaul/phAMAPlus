import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";
function Dashboard() {
  return (
    // <View>
    <NativeBaseProvider>
      <Text> Headed to greatness with Kinjoz</Text>
    </NativeBaseProvider>
    // </View>
  );
}

export default Dashboard;
