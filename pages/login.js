import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";

// login form
const LoginSignupForm = () => {
  const verifyUser = async (event) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/login";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    // check if the result from the API is valid
    if (result.exists) {
      // login is valid, set the localStorage field for email and first name
      localStorage.setItem("email", event.target.email.value);
      localStorage.setItem("first_name", result.first_name);

      // redirect the user back to the home page
      window.location.href = "/";
    } else {
      alert("Invalid username and password");
    }
  };

  return (
    <>
      <Flex h="100vh" alignItems="center" justifyContent="center">
        <Box
          w="sm"
          p={8}
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg" // add gray shadow here
          bg="white"
        >
          <Image src="/studioustransparent.png" width={300} height={150} />
          <form onSubmit={verifyUser}>
            <FormControl mt={4}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="name@example.com"
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
              />
            </FormControl>
            <Checkbox mt={4}>
              Remember me
            </Checkbox>
            <Button
              bg="black" // add black background here
              color="white" // keep white text color here
              size="lg"
              mt={4}
              width="100%"
              type="submit"
            >
              Sign in
            </Button>
          </form>
          <Text mt={4}>
            New User? <Link href="/signup">Create Here</Link>
          </Text>
        </Box>
      </Flex>
    </>
  );
};


export default LoginSignupForm;
