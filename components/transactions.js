import React, { useEffect, useState } from "react";
import { StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
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
  Image,
  Link,
} from "native-base";
import Colors from "../config/colors";
import * as SecureStore from "expo-secure-store";

function Transactions({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleTransactions = async () => {
    setIsLoading(true);
    let token = await SecureStore.getItemAsync("token");
    let memberno = await SecureStore.getItemAsync("memberno");
    if (token || memberno) {
      return fetch(
        `http://102.37.102.247:5016/CustomerPoints/GetCustomerTransactions?memberNo=${"PP000008"}`,
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
            setTransactions(data);
            console.log(data);
          } else {
            const data = await response.json();
            setIsLoading(false);
            alert(data.errors.message);
            return console.log(data);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error.message);
          alert("Check your internet connection!");
          // ADD THIS THROW error
          throw error;
        });
    } else {
      alert("No values stored under that key.");
    }
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleTransactions();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    handleTransactions();
  }, []);

  return (
    <NativeBaseProvider>
      <View flex={1}>
        {/* <Box safeAreaTop />
        <HStack
          py="3"
          px="2"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          bg="coolGray.200"
        >
          <Heading size="md"> Transaction</Heading>
        </HStack> */}
        {isLoading ? (
          <Center flex={1}>
            <ActivityIndicator size="large" color="#0000ff" />
          </Center>
        ) : (
          <ScrollView
            // bg="indigo.200"
            p={3}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {transactions ? (
              transactions.map((transaction, index) => (
                <Link
                  onPress={() =>
                    navigation.navigate("transactionDetails", {
                      docNum: transaction.DOCNUM,
                      salesBCODE: transaction.SALESBCODE,
                      branch: transaction.SALESBRANCH,
                      gain: transaction.MEMPOINTSBUY,
                      redeemed: transaction.MEMPOINTSREDEEM,
                      transdate: transaction.SALEDATE,
                    })
                  }
                  key={index}
                >
                  <Box
                    width="100%"
                    p="3"
                    my={1}
                    rounded="md"
                    bg="coolGray.100"
                    borderWidth={1}
                    // shadow={2}
                  >
                    <HStack justifyContent="space-between" alignItems="center">
                      <VStack>
                        <Text
                          color={"muted.800"}
                          fontWeight="600"
                          fontSize={"sm"}
                        >
                          {transaction.DOCNUM}
                        </Text>
                        <HStack>
                          <Text
                            color={"muted.800"}
                            fontWeight="400"

                            // style={styles.myText}
                            // fontSize={'8'}
                          >
                            {new Date(transaction.SALEDATE).toDateString()}
                          </Text>
                          <Center>
                            <Divider orientation="vertical" h={3} mx={1} />
                          </Center>

                          <Text
                            color={"muted.800"}
                            fontWeight="400"

                            // style={styles.myText}
                            // fontSize={'8'}
                          >
                            {transaction.SALESBRANCH}
                          </Text>
                        </HStack>
                        <Text
                          color={"muted.800"}
                          fontWeight="600"
                          fontSize={"sm"}
                        >
                          Kshs.
                          {transaction.Itmtotalinc.toFixed(2)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Text>
                        <HStack space={3}>
                          <Text
                            color="success.600"
                            fontWeight="400"
                            // style={styles.myText}
                          >
                            Earned:{" "}
                            {transaction.MEMPOINTSBUY.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                          </Text>

                          <Text
                            color="danger.600"
                            fontWeight="400"
                            // style={styles.myText}
                          >
                            Redeemed:{" "}
                            {transaction.MEMPOINTSREDEEM.toString().replace(
                              /\B(?=(\d{3})+(?!\d))/g,
                              ","
                            )}
                          </Text>
                        </HStack>
                      </VStack>
                      <Image
                        source={require("../assets/right.png")}
                        alt="company logo"
                        // style={styles.companyLogo}
                        size="2xs"
                      />
                    </HStack>
                  </Box>
                </Link>
              ))
            ) : (
              <Text
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
                fontWeight="500"
                fontSize="xs"
              >
                No Transaction History
              </Text>
            )}
          </ScrollView>
        )}
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

export default Transactions;
