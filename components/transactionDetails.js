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
  Text,
  VStack,
  Divider,
  Flex,
  ScrollView,
  Image,
  Spacer,
} from "native-base";
import Colors from "../config/colors";
import * as SecureStore from "expo-secure-store";

function TransactionDetails({ route }) {
  const { docNum, salesBCODE, branch, gain, redeemed, transdate } =
    route.params;

  const [transactionDetails, setTransactionDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleTransactionDetails = async () => {
    setIsLoading(true);
    let token = await SecureStore.getItemAsync("token");
    let memberno = await SecureStore.getItemAsync("memberno");
    if (token || memberno) {
      return fetch(
        `http://102.37.102.247:5016/CustomerPoints/GetTransactionDetails?salesBcode=1&docNum=CS00000152&memberNumber=PP000008`,
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
            setTransactionDetails(data);
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

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleTransactionDetails();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    handleTransactionDetails();
  }, []);

  return (
    <NativeBaseProvider>
      <View flex={1}>
        {isLoading ? (
          <Center flex={1}>
            <ActivityIndicator size="large" color="#0000ff" />
          </Center>
        ) : (
          <ScrollView
            p={3}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <HStack
              bg="#fff"
              p="2"
              justifyContent="space-between"
              alignItems="center"
              borderWidth={1}
              rounded="md"
            >
              <Center mx={"auto"}>
                <Text mx={"auto"} fontWeight={"500"} color={"#5d3915"}>
                  {docNum}
                </Text>
                <VStack>
                  <HStack>
                    <Text mx={"auto"} color={"muted.500"}>
                      {transdate ? new Date(transdate).toDateString() : null}
                    </Text>
                    <Center>
                      <Divider
                        orientation="vertical"
                        h={3}
                        bg={"muted.500"}
                        mx={1}
                      />
                    </Center>
                    <Center>
                      <Text color={"muted.500"} fontWeight="400" fontSize={10}>
                        {branch}
                      </Text>
                    </Center>
                  </HStack>
                  {/* <Text mx={'auto'} color={'muted.500'}>
                    {date ? new Date(date).toDateString() : null}
                  </Text> */}
                  <Text color="#5d3915" mx={"auto"} fontWeight={500}>
                    Kshs:{" "}
                    {transactionDetails
                      .reduce((previousValue, curr) => {
                        return previousValue + curr.totalCost;
                      }, 0)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Text>

                  <Center>
                    <HStack space={3}>
                      <HStack>
                        <Text>Earned: </Text>
                        <Text color="success.600">
                          {gain
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text>Redeemed: </Text>

                        <Text color="danger.600">
                          {redeemed
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </Text>
                      </HStack>
                    </HStack>
                  </Center>
                </VStack>
              </Center>
            </HStack>

            <Divider my={2} />

            {transactionDetails ? (
              transactionDetails.map((transactionDetail, index) => (
                <Box mx={"5"} key={index}>
                  <VStack>
                    <HStack>
                      <VStack>
                        <Text
                          color="#5d3915"
                          fontSize={"sm"}
                          // fontSize={15}
                          my={1}
                          fontWeight={500}
                        >
                          {transactionDetail.itmname}
                        </Text>
                        <HStack>
                          <Text
                            color={"muted.500"}
                            fontSize={14}
                            mb={1}
                            fontWeight={400}
                          >
                            {transactionDetail.itmcode}
                          </Text>
                          <Spacer />
                          <Text color={"muted.500"} fontSize={14}>
                            Qty: {transactionDetail.quantity}
                          </Text>
                        </HStack>
                      </VStack>

                      <Spacer />
                      <Text
                        color="#5d3915"
                        // style={{fontSize: RFValue(9.5, 580)}}
                        // fontSize={9}
                        my={1}
                      >
                        {transactionDetail.totalCost.toFixed(2)}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>

                // <Box
                //   width="100%"
                //   p="3"
                //   my={1}
                //   rounded="md"
                //   bg="coolGray.100"
                //   shadow={2}
                //   key={index}
                // >
                //   <HStack justifyContent="space-between" alignItems="center">
                //     <VStack>
                //       <Text
                //         color={"muted.800"}
                //         fontWeight="600"
                //         fontSize={"sm"}
                //       >
                //         {transaction.DOCNUM}
                //       </Text>
                //       <HStack>
                //         <Text
                //           color={"muted.800"}
                //           fontWeight="400"

                //           // style={styles.myText}
                //           // fontSize={'8'}
                //         >
                //           {new Date(transaction.SALEDATE).toDateString()}
                //         </Text>
                //         <Center>
                //           <Divider orientation="vertical" h={3} mx={1} />
                //         </Center>

                //         <Text
                //           color={"muted.800"}
                //           fontWeight="400"

                //           // style={styles.myText}
                //           // fontSize={'8'}
                //         >
                //           {transaction.SALESBRANCH}
                //         </Text>
                //       </HStack>
                //       <Text
                //         color={"muted.800"}
                //         fontWeight="600"
                //         fontSize={"sm"}
                //       >
                //         Kshs.
                //         {transaction.Itmtotalinc.toFixed(2)
                //           .toString()
                //           .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                //       </Text>
                //       <HStack space={3}>
                //         <Text
                //           color="success.600"
                //           fontWeight="400"
                //           // style={styles.myText}
                //         >
                //           Earned:{" "}
                //           {transaction.MEMPOINTSBUY.toString().replace(
                //             /\B(?=(\d{3})+(?!\d))/g,
                //             ","
                //           )}
                //         </Text>

                //         <Text
                //           color="danger.600"
                //           fontWeight="400"
                //           // style={styles.myText}
                //         >
                //           Redeemed:{" "}
                //           {transaction.MEMPOINTSREDEEM.toString().replace(
                //             /\B(?=(\d{3})+(?!\d))/g,
                //             ","
                //           )}
                //         </Text>
                //       </HStack>
                //     </VStack>
                //     <Image
                //       source={require("../assets/right.png")}
                //       alt="company logo"
                //       // style={styles.companyLogo}
                //       size="2xs"
                //     />
                //   </HStack>
                // </Box>
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
            <Divider my={2} />
          </ScrollView>
        )}
      </View>
    </NativeBaseProvider>
  );
}

export default TransactionDetails;
