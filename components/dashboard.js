import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { NativeBaseProvider, Center, View } from "native-base";
import Colors from "../constants/colors";
import * as SecureStore from "expo-secure-store";

function Dashboard() {
  const storeData = async () => {
    let result = await SecureStore.getItemAsync("Future");
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert("No values stored under that key.");
    }
  };

  useEffect(() => {
    storeData();
  }, []);

  return (
    <NativeBaseProvider>
      <View flex={1}>
        <View flex={1} bg="indigo.300">
          <Text> Headed to greatness with Kinjoz</Text>
        </View>
        <View flex={1} bg="indigo.500">
          <Text> Headed to greatness with Kinjoz</Text>
        </View>
        <View flex={1} bg="indigo.700">
          <Text> Headed to greatness with Kinjoz</Text>
        </View>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.phAMACoreColor1,
  },
  box1: {
    flex: 3,
    backgroundColor: Colors.danger,
  },
  box2: {
    flex: 1,
    justifyContent: "center",
  },
  box3: {
    flex: 1,
  },
});

export default Dashboard;
