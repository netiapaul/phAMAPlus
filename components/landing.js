import React from "react";
import { StyleSheet, View } from "react-native";
import Colors from "../constants/colors";
import {
  NativeBaseProvider,
  Heading,
  Center,
  Pressable,
  Box,
  Text,
  Image,
} from "native-base";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

function Landing({ navigation }) {
  const storeData = async () => {
    await SecureStore.setItemAsync("Future", "MegaJackpot Winner with Kinjoz");
    // try {
    //   const jsonValue = JSON.stringify(value);
    //   await AsyncStorage.setItem("@storage_Key", jsonValue);
    // } catch (e) {
    //   // saving error
    //   console.log(e);
    // }
    return navigation.navigate("Login");
  };
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View flex={3}>
          <Center flex={1}>
            <Image
              source={require("../assets/shopping.png")}
              alt="Alternate Text"
              resizeMode="contain"
            />
          </Center>
        </View>
        <View style={styles.box2}>
          <Box p="5">
            <Heading size="2xl">Find a way to manage</Heading>
            <Heading size="2xl">your Transactions</Heading>
            <Text fontSize="md">Best Solution to save your</Text>
            <Text fontSize="md">loyalty points & transactions</Text>
          </Box>
        </View>
        <View style={styles.box3}>
          {/* bg="indigo.700" */}
          <Center flex={1}>
            <Pressable
              onPress={storeData}
              // onPress={() => console.log("MegaJackpot Winner with Kinjoz")}
            >
              {({ isHovered, isFocused, isPressed }) => {
                return (
                  <Box
                    borderColor="none"
                    bg={
                      isPressed
                        ? Colors.phAMACoreColor1
                        : Colors.phAMACoreColor2
                    }
                    minW="75%"
                    rounded={"md"}
                    p="5"
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 1 : 1,
                        },
                      ],
                    }}
                  >
                    <Center>
                      <Text style={{ color: "white" }}>Get Started</Text>
                    </Center>
                  </Box>
                );
              }}
            </Pressable>
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
  //   image: {
  //     maxWidth: 350,
  //     maxHeight: 350,
  //   },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: "WorkSans-Bold",
  },
  subtitle: {
    textAlign: "center",
    fontFamily: "WorkSans-Regular",
    paddingHorizontal: 64,
    paddingVertical: 16,
  },
});

export default Landing;
