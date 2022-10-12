import React, { useState, useEffect } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import {
  NativeBaseProvider,
  Box,
  View,
  Stack,
  HStack,
  Heading,
  Center,
  Avatar,
  Text,
  VStack,
  Divider,
  Flex,
  ScrollView,
} from "native-base";
import Colors from "../config/colors";
import * as SecureStore from "expo-secure-store";
// import Snackbar from "react-native-snackbar";

function Dashboard({ route, navigation }) {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleDashboard = async () => {
    setIsLoading(true);
    let token = await SecureStore.getItemAsync("token");
    let memberno = await SecureStore.getItemAsync("memberno");
    if (token || memberno) {
      return fetch(
        `http://102.37.102.247:5016/Customers/members?memberNum=${memberno}`,
        {
          method: "GET", // GET, POST, PUT, DELETE, etc.
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            setIsLoading(false);
            setUserData(data[0]);
            console.log(data);
          } else {
            const data = await response.json();
            setIsLoading(false);
            return console.log(data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error.message);
          // ADD THIS THROW error
          throw error;
        });
    } else {
      alert("No values stored under that key.");
    }
  };

  const storeData = async () => {
    let result = await SecureStore.getItemAsync("token");
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert("No values stored under that key.");
    }
  };

  useEffect(() => {
    handleDashboard();
  }, []);

  return (
    <NativeBaseProvider>
      {isLoading ? (
        <Center flex={1}>
          <ActivityIndicator size="large" color="#0000ff" />
        </Center>
      ) : (
        <View flex={1}>
          <Box safeAreaTop />
          <HStack
            px="1"
            py="4"
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            bg="coolGray.200"
          >
            <Heading> Dashboard</Heading>
            <Avatar bg="green.500" mr="1" size="sm">
              RS
            </Avatar>
          </HStack>
          <Box bg="primary.100" p="2" mt={1}>
            <VStack>
              <Text fontSize={"2xs"}> Welcome back,</Text>
              <Text fontWeight={"semibold"}> {userData.membername}</Text>
            </VStack>
          </Box>
          <View flex={1} p="5" justifyContent="center">
            <Box
              // minW="80"
              shadow={5}
              rounded="lg"
              overflow="hidden"
              borderColor="coolGray.200"
              borderWidth=".5"
              _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700",
              }}
              _web={{
                shadow: 2,
                borderWidth: 0,
              }}
              _light={{
                backgroundColor: "gray.50",
              }}
            >
              <Stack p="4" space={3}>
                <Stack space={2}>
                  <Heading size="sm">phAMAplus Points</Heading>
                  {/* <Text
                    fontSize="xs"
                    _light={{
                      color: "violet.500",
                    }}
                    _dark={{
                      color: "violet.400",
                    }}
                    fontWeight="500"
                    ml="-0.5"
                    mt="-1"
                  >
                    Points available.
                  </Text> */}
                </Stack>
                <Text fontWeight="500" space={3} fontSize="5xl">
                  {userData.mempointsbal} pts
                </Text>
                {/* <HStack
                  alignItems="center"
                  space={4}
                  justifyContent="space-between"
                >
                  <HStack alignItems="center">
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      fontWeight="300"
                      fontSize="xs"
                    >
                      Points Details
                    </Text>
                  </HStack>
                </HStack> */}
                <HStack
                  alignItems="center"
                  space={4}
                  justifyContent="space-between"
                >
                  <HStack alignItems="center">
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      fontWeight="500"
                      fontSize="xs"
                    >
                      {userData.membername}
                    </Text>
                  </HStack>
                  <HStack alignItems="center">
                    <Text
                      color="coolGray.600"
                      _dark={{
                        color: "warmGray.200",
                      }}
                      fontWeight="500"
                      fontSize="xs"
                    >
                      {new Date().toDateString()}
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
            <Flex
              direction="row"
              p="4"
              w={"100%"}
              justifyContent="space-between"
              mt={2}
            >
              <VStack mx={"auto"}>
                <Text mx={"auto"} fontWeight="200">
                  Available
                </Text>
                <Text mx={"auto"} fontWeight={"bold"}>
                  {userData.mempointsbal} pts
                </Text>
              </VStack>

              <Divider thickness="1" mx="2" orientation="vertical" />
              <VStack mx={"auto"}>
                <Text mx={"auto"} fontWeight="200">
                  Gained
                </Text>
                <Text mx={"auto"} fontWeight={"bold"}>
                  {userData.mempointsbuy} pts
                </Text>
              </VStack>

              <Divider thickness="1" mx="2" orientation="vertical" />
              <VStack mx={"auto"}>
                <Text mx={"auto"} fontWeight="200">
                  Redeemed
                </Text>
                <Text mx={"auto"} fontWeight={"bold"}>
                  {userData.mempointsredeem} pts
                </Text>
              </VStack>
            </Flex>
          </View>
          <View flex={2} bg="coolGray.300" px="3">
            <Heading mt={2} mb={1}>
              Recent Transactions
            </Heading>
            <ScrollView>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
              <Box
                width="100%"
                p="4"
                my={1}
                rounded="lg"
                bg="coolGray.100"
                shadow={2}
              >
                <Text> Headed to greatness with Kinjoz</Text>
              </Box>
            </ScrollView>
          </View>
          {/* <View flex={1} bg="indigo.700" px="3">
          <Center flex={1}>
            <Box width="100%" bg="primary.500" p="4" mt={1}>
              <Text> Headed to greatness with Kinjoz</Text>
            </Box>
          </Center>
        </View> */}
        </View>
      )}
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  appBar: {
    elevation: 20,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 10,
    // backgroundColor: Colors.phAMACoreColor1,
  },
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
