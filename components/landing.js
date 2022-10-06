import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";
import {
  NativeBaseProvider,
  Container,
  Heading,
  Center,
  Flex,
  Pressable,
  Box,
} from "native-base";
function Landing() {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3" style={styles.container}>
        <Flex direction="column">
          <Center flex={3} minW="100%" bg="indigo.300">
            <Heading>
              A component library for the
              <Text color="emerald.500"> React Ecosystem</Text>
            </Heading>
          </Center>
          <Box flex={1} minW="100%" bg="indigo.500">
            <Heading>Find a way to manage</Heading>
            <Heading>your Transactions</Heading>
            <Text color="emerald.500"> Best Solution to save your</Text>
            <Text color="emerald.500"> loyalty points & transactions</Text>
          </Box>
          <Center flex={1} bg="indigo.700">
            <Pressable
              onPress={() => console.log("MegaJackpot Winner with Kinjoz")}
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
            {/* <Button
              minW="75%"
              size={"lg"}
              rounded={"none"}
              p="5"
              onPress={() => console.log("MegaJackpot Winner with Kinjoz")}
              bg={Colors.phAMACoreColor2}
            >
              Click Me
            </Button> */}
          </Center>
        </Flex>
      </Center>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C58C4F",
    alignItems: "center",
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
