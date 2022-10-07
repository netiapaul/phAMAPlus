import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import Colors from "../../constants/colors";
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
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

function Login() {
  const [formData, setFormData] = useState({
    nationalID: "",
    pin: "",
    isLoading: false,
  });
  const [errors, setErrors] = useState({
    nationalID: "",
    pin: "",
  });
  const [show, setShow] = useState(false);
  /**
   * TODO: Handle Validate form
   */
  const validate = () => {
    if (!formData.nationalID) {
      setErrors({ ...errors, nationalID: "National ID is required" });
      return false;
    } else if (!formData.pin) {
      setErrors({ ...errors, pin: "Pin is required" });
      return false;
    }
    return true;
  };
  /**
   * TODO: Handle Submit form
   */
  const handleSubmit = () => {
    validate()
      ? alert(`${formData.nationalID} ${formData.pin}`)
      : alert("Validation Failed");
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View flex={1}>
          <Center flex={1} bg="violet.500">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Welcome
            </Heading>
          </Center>
        </View>
        {/*  w="100%" */}
        <Center px="5">
          <Box p="2" w="100%">
            <Heading
              size="lg"
              fontWeight="600"
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
                isLoading={formData.isLoading}
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
