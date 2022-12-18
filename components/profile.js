import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, StyleSheet, ToastAndroid } from "react-native";
import Colors from "../config/colors";
import {
  NativeBaseProvider,
  Box,
  View,
  Heading,
  Center,
  Text,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Pressable,
  Avatar,
  Icon,
  Image,
  Alert,
  useToast,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { API_URL } from "@env";

function Login({ navigation }) {
  const toast = useToast();

  const [formData, setFormData] = useState({
    nationalID: "",
    currentPin: "",
    newPin: "",
  });
  const [errors, setErrors] = useState({
    currentPin: "",
    newPin: "",
  });

  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  /**
   * TODO: Handle Validate form
   */
  const validate = () => {
    if (!formData.currentPin && !formData.newPin) {
      setErrors({
        ...errors,
        currentPin: "Current Pin is required",
        newPin: "New Pin is required",
      });
      return false;
    } else if (!formData.currentPin) {
      setErrors({ ...errors, currentPin: "Current Pin is required" });
      return false;
    } else if (!formData.newPin) {
      setErrors({ ...errors, newPin: "New Pin is required" });
      return false;
    }
    setErrors({ ...errors, currentPin: "", newPin: "" });
    return true;
  };
  const UpdatePassword = async () => {
    setIsLoading(true);
    // let token = await SecureStore.getItemAsync("token");
    // let memberno = await SecureStore.getItemAsync("memberno");
    let token = await AsyncStorage.getItem("token");
    let memberno = await AsyncStorage.getItem("memberno");
    if (token && memberno) {
      return fetch(
        `http://102.37.102.247:5016/CustomerPoints/UpdatePassword/${memberno}`,
        {
          method: "POST", // GET, POST, PUT, DELETE, etc.
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPin: formData.currentPin,
            newPin: formData.newPin,
          }),
        }
      )
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            setIsLoading(false);
            alert(data.message);
            console.log(data);
            setFormData({
              nationalID: "",
              currentPin: "",
              newPin: "",
            });
            // return navigation.navigate("Home");
            // return navigation.navigate("Dashboard");
          } else {
            const data = await response.json();
            setIsLoading(false);
            alert(data.errors.message);
            // Snackbar.show({
            //   text: "Hello world",
            //   duration: Snackbar.LENGTH_SHORT,
            // });

            // Alert(data.errors.message);
            return console.log(data.errors.message);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.log("Catch", error.message);
          alert("Check your internet connection!");
          // ADD THIS THROW error
          throw error;
        });
    } else {
      alert("No values stored under that key.");
    }
  };
  /**
   * TODO: Handle Submit form
   */
  const handleSubmit = () => {
    validate()
      ? UpdatePassword()
      : ToastAndroid.showWithGravityAndOffset(
          "Please fill in the blanks !",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        );
    // : Snackbar.show({
    //     text: "Hello world",
    //     duration: Snackbar.LENGTH_SHORT,
    //   });
  };

  const fetchData = async () => {
    // let fullusername = await SecureStore.getItemAsync("fullusername");
    let fullusername = await AsyncStorage.getItem("fullusername");
    if (fullusername) {
      setUserName(fullusername);
    } else {
      alert("No values stored under that key.");
    }
  };

  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error("Something went wrong on fetching", e);
    }
    return navigation.navigate("Login");
  };

  useEffect(() => {
    fetchData();
    // handleDashboard();
  }, []);

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View flex={1} bg="coolGray.50">
          <Center flex={1}>
            {/* <Image
              source={require("../assets/pcico.png")}
              alt="Alternate Text"
              resizeMode="contain"
            /> */}
            <Avatar bg="blueGray.600" size="xl">
              {userName ? userName.match(/\b([A-Z])/g).join("") : null}
            </Avatar>
            {/* <Heading
              size="lg"
              fontWeight="900"
              color={Colors.phAMACoreColor3}
              _dark={{
                color: "warmGray.50",
              }}
            >
              {userName}
            </Heading> */}
          </Center>
        </View>
        {/*  w="100%" */}
        <Center px="5" flex={3} bg="coolGray.200">
          <Box p="2" w="100%" flex={1}>
            <Heading
              size="lg"
              fontWeight="700"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Update Pin
            </Heading>
            <Heading
              mt="1"
              _dark={{
                color: "warmGray.200",
              }}
              color="coolGray.600"
              fontWeight="medium"
              size="xs"
            >
              Fill in the form to update your pin
            </Heading>

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>User Name</FormControl.Label>
                <Input
                  type={"text"}
                  value={userName}
                  onChangeText={(value) => setUserName(value)}
                  isReadOnly
                  borderWidth="1"
                  borderColor={"gray.400"}
                />
              </FormControl>
              <FormControl isRequired isInvalid={"currentPin" in errors}>
                <FormControl.Label>Current Pin</FormControl.Label>
                <Input
                  type={show ? "text" : "password"}
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    setFormData({ ...formData, currentPin: value })
                  }
                  borderWidth="1"
                  borderColor={"gray.400"}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
                {"currentPin" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.currentPin}
                  </FormControl.ErrorMessage>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl isRequired isInvalid={"newPin" in errors}>
                <FormControl.Label>New Pin</FormControl.Label>
                <Input
                  type={show ? "text" : "password"}
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    setFormData({ ...formData, newPin: value })
                  }
                  borderWidth="1"
                  borderColor={"gray.400"}
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
                {"newPin" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.newPin}
                  </FormControl.ErrorMessage>
                ) : (
                  ""
                )}
              </FormControl>

              <Button
                mt="2"
                bg={Colors.phAMACoreColor2}
                // colorScheme="indigo"
                _text={{
                  fontSize: "md",
                  fontWeight: "500",
                  color: "white",
                }}
                p={4}
                isLoading={isLoading}
                isLoadingText="Submitting"
                onPress={handleSubmit}
              >
                Update
              </Button>
              <Button
                mt="2"
                bg={"coolGray.400"}
                // colorScheme="indigo"
                _text={{
                  fontSize: "md",
                  fontWeight: "500",
                  color: "white",
                }}
                p={4}
                // isLoading={isLoading}
                isLoadingText="Submitting"
                onPress={clearAll}
              >
                Log Out
              </Button>
            </VStack>
          </Box>
        </Center>
      </KeyboardAvoidingView>
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
});

export default Login;
