import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
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
} from "native-base";
import Colors from "../config/colors";
import * as SecureStore from "expo-secure-store";
// import Snackbar from "react-native-snackbar";

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleDashboard = async () => {
    setIsLoading(true);
    let token = await SecureStore.getItemAsync("token");
    if (token) {
      return fetch(
        `http://102.37.102.247:5016/Customers/members?memberNum=PPL000031`,
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
          <Avatar bg="green.500" mr="1" size="sm">
            RS
          </Avatar>
        </HStack>
        <View flex={1} bg="indigo.300" justifyContent="center">
          <Box alignItems="center">
            <Box
              // maxW="80"
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
                  <Heading size="md" ml="-1">
                    phAMAplus Points
                  </Heading>
                  <Text
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
                  </Text>
                </Stack>
                <Text fontWeight="400">
                  Bengaluru (also called Bangalore) is the center of India's
                  high-tech industry. The city is also known for its parks and
                  nightlife.
                </Text>
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
                      fontWeight="300"
                      fontSize="xs"
                    >
                      Points Details
                    </Text>
                  </HStack>
                </HStack>
              </Stack>
            </Box>
          </Box>
        </View>
        <View flex={2} bg="indigo.500" px="3" justifyContent="center">
          <Heading pb="2" bg="violet.500">
            Recent Activity {userData.memidno}
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
