import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import {
  NativeBaseProvider,
  Box,
  View,
  HStack,
  Heading,
  Center,
} from "native-base";
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
        <Box safeAreaTop />
        <HStack
          px="1"
          py="4"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
        >
          <Heading> Dashboard</Heading>
        </HStack>
        <View flex={1} bg="indigo.300">
          <Text> Headed to greatness with Kinjoz</Text>
        </View>
        <View flex={2} bg="indigo.500" px="3" justifyContent="center">
          <Heading pb="2" bg="violet.500">
            Recent Activity
          </Heading>
          <Box width="100%" bg="primary.500" p="4" my={1}>
            <Text> Headed to greatness with Kinjoz</Text>
          </Box>
          <Box width="100%" bg="primary.500" p="4" my={1}>
            <Text> Headed to greatness with Kinjoz</Text>
          </Box>
          <Box width="100%" bg="primary.500" p="4" my={1}>
            <Text> Headed to greatness with Kinjoz</Text>
          </Box>
          <Box width="100%" bg="primary.500" p="4" my={1}>
            <Text> Headed to greatness with Kinjoz</Text>
          </Box>
          <Box width="100%" bg="primary.500" p="4" mt={1}>
            <Text> Headed to greatness with Kinjoz</Text>
          </Box>
        </View>
        <View flex={1} bg="indigo.700" px="3">
          <Center flex={1}>
            <Box width="100%" bg="primary.500" p="4" mt={1}>
              <Text> Headed to greatness with Kinjoz</Text>
            </Box>
          </Center>
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
