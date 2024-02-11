import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/hooks";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/functionsAndimage";
import { Spinner } from "@chakra-ui/react";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };
  const headers = {
    "Content-Type": "application/json",
  };
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`${API}/register`, signupData, {
        headers: headers,
      })
      .then((res) => {
        localStorage.setItem("USER-TOKEN", res.data.token);
        toast({
          title: "SignUp Successfully",
          description: "You will be redireted to dashboard page.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      })
      .catch((err) => {
        let message = err.response.data.message;

        console.log(signupData.email);
        if (
          message ===
          `E11000 duplicate key error collection: trupti.users index: email_1 dup key: { email: "${signupData.email}" }`
        ) {
          message = "Email is already registered.";
        }
        setLoading(false);
        toast({
          title: "SignUp Failed",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  const clearData = () => {
    setSignupData({ ...signupData, email: "", password: "", name: "" });
  };
  const clearAndClose = () => {
    clearData();
    onClose();
  };
  return (
    <>
      <Text mt={2} leftIcon={<AddIcon />} color="teal" onClick={onOpen}>
        SignUp
      </Text>
      <Drawer
        isOpen={isOpen}
        placement="left"
        initialFocusRef={firstField}
        onClose={onClose}
        size="lg"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create a new account
          </DrawerHeader>
          <form onSubmit={handleSignupSubmit}>
            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    ref={firstField}
                    placeholder="Please enter user name"
                    name="name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="name">Email</FormLabel>
                  <Input
                    placeholder="Please enter user email"
                    name="email"
                    type="email"
                    onChange={handleSignupChange}
                    value={signupData.email}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    placeholder="Please enter user password"
                    name="password"
                    type="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                  />
                </Box>
              </Stack>
            </DrawerBody>
            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={clearAndClose}>
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit">
                {loading ? <Spinner color="red.500" /> : "Sign Up"}
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SignUp;
