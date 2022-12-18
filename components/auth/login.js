import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, ToastAndroid } from "react-native";
import Colors from "../../config/colors";
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
    pin: "",
  });
  const [errors, setErrors] = useState({
    nationalID: "",
    pin: "",
  });
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  /**
   * TODO: Handle Validate form
   */
  const validate = () => {
    if (!formData.nationalID && !formData.pin) {
      setErrors({
        ...errors,
        nationalID: "National ID is required",
        pin: "Pin is required",
      });
      return false;
    } else if (!formData.nationalID) {
      setErrors({ ...errors, nationalID: "National ID is required" });
      return false;
    } else if (!formData.pin) {
      setErrors({ ...errors, pin: "Pin is required" });
      return false;
    }
    setErrors({ ...errors, nationalID: "", pin: "" });
    return true;
  };
  const handleLogin = async () => {
    setIsLoading(true);
    return fetch(`http://102.37.102.247:5016/CustomerPoints/CustomerLogin`, {
      method: "POST", // GET, POST, PUT, DELETE, etc.
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        // Authorization: `Bearer adas`,
      },
      body: JSON.stringify({
        idnumber: formData.nationalID,
        pin: formData.pin,
      }),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setIsLoading(false);
          // await SecureStore.setItemAsync("token", data.token);
          // await SecureStore.setItemAsync("memberno", data.user.memberno);
          // await SecureStore.setItemAsync(
          //   "fullusername",
          //   data.user.fullusername
          // );
          await AsyncStorage.setItem("token", data.token);
          await AsyncStorage.setItem("memberno", data.user.memberno);
          await AsyncStorage.setItem("fullusername", data.user.fullusername);
          console.log(data);
          // return navigation.navigate("Home");
          setFormData({
            nationalID: "",
            pin: "",
          });
          return navigation.navigate("Dashboard");
        } else {
          const data = await response.json();
          setIsLoading(false);
          alert(data.errors.message);
          // <Alert w="100%" status={"error"}>
          //   <VStack space={2} flexShrink={1} w="100%">
          //     <HStack flexShrink={1} space={2} justifyContent="space-between">
          //       <HStack space={2} flexShrink={1}>
          //         <Alert.Icon mt="1" />
          //         <Text fontSize="md" color="coolGray.800">
          //           {data.errors.message}
          //         </Text>
          //       </HStack>
          //     </HStack>
          //   </VStack>
          // </Alert>;
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
  };
  /**
   * TODO: Handle Submit form
   */
  const handleSubmit = () => {
    validate()
      ? handleLogin()
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

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View flex={1} bg="coolGray.50">
          <Center flex={1}>
            <Image
              source={require("../../assets/pcico.png")}
              alt="Alternate Text"
              resizeMode="contain"
            />
            <Heading
              size="2xl"
              fontWeight="900"
              color={Colors.phAMACoreColor3}
              _dark={{
                color: "warmGray.50",
              }}
            >
              phAMACore
            </Heading>
          </Center>
        </View>
        {/*  w="100%" */}
        <Center px="5" flex={1} bg="coolGray.200">
          <Box p="2" w="100%" flex={1}>
            <Heading
              size="lg"
              fontWeight="700"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Welcome
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
              Sign in to continue!
            </Heading>

            <VStack space={3} mt="5">
              <FormControl isRequired isInvalid={"nationalID" in errors}>
                <FormControl.Label>National ID</FormControl.Label>
                <Input
                  placeholder="12345678"
                  onChangeText={(value) =>
                    setFormData({ ...formData, nationalID: value })
                  }
                  borderWidth="1"
                  borderColor={"gray.400"}
                />
                {"nationalID" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.nationalID}
                  </FormControl.ErrorMessage>
                ) : (
                  ""
                )}
              </FormControl>
              <FormControl isRequired isInvalid={"pin" in errors}>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  type={show ? "text" : "password"}
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    setFormData({ ...formData, pin: value })
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
                {"pin" in errors ? (
                  <FormControl.ErrorMessage>
                    {errors.pin}
                  </FormControl.ErrorMessage>
                ) : (
                  ""
                )}
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Forget Password?
                </Link>
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
                Sign in
              </Button>
              <HStack my="3" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm a new user.{" "}
                </Text>
                <Link
                  _text={{
                    color: "indigo.500",
                    fontWeight: "medium",
                    fontSize: "sm",
                  }}
                  href="#"
                >
                  Sign Up
                </Link>
              </HStack>
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
