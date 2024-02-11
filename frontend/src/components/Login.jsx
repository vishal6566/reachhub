import React, { useState } from "react";
import "../Styles/login.css";
import { loginBannerImage, logo } from "../utils/functionsAndimage";
import { useNavigate } from "react-router-dom";
import { API } from "../utils/functionsAndimage";
import { Spinner } from "@chakra-ui/react";
import {
  FormControl,
  Button,
  Input,
  Heading,
  Text,
  Box,
  useToast,
} from "@chakra-ui/react";
import SignUp from "./SignUp";
import axios from "axios";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const headers = {
    "Content-Type": "application/json",
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(`${API}/login`, loginData, {
        headers: headers,
      })
      .then((res) => {
        localStorage.setItem("USER-TOKEN", res.data.token);
        toast({
          title: "SignIn Successfully",
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
        setLoading(false);
        toast({
          title: "SignIn Failed",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <div className="container">
      <div className="loginContainer">
        <div>
          <div>
            <img src={logo} alt="logo" />
          </div>
          <div>
            <form onSubmit={handleLoginSubmit}>
              <FormControl>
                <Heading as="h4" size="md" mt={5}>
                  Sign In
                </Heading>

                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleLoginChange}
                  value={loginData.email}
                  mt={5}
                />

                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleLoginChange}
                  value={loginData.password}
                  mt={5}
                />

                <Button colorScheme="blue" mt={5} w="100%" type="submit">
                  {loading ? <Spinner color="red.500" /> : "Sign In"}
                </Button>
              </FormControl>
            </form>
            <Box className="newUserBox">
              <Text fontSize="md" mt={2}>
                New User ?
              </Text>
              <div className="signupDiv">
                <SignUp />
              </div>
            </Box>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src={loginBannerImage} alt="Login banner" />
      </div>
    </div>
  );
};

export default Login;
