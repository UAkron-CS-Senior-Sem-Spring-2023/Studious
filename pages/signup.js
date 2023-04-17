import React, { useState } from "react";
import Router from "next/router";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";

const Signup = () => {
  const addUser = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      first_name: formData.get("first_name"),
    };

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/users";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const result = await response.json();

    // check if the post was successful
    if (result.success) {
      // set the localsession variable
      localStorage.setItem("email", formData.get("email"));
      localStorage.setItem("first_name", formData.get("first_name"));

      // redirect the user back to the home page
      Router.push("/");
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" h="100vh">
      <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Image src="/studioustransparent.png" width={300} height={150} />
        <form onSubmit={addUser}>
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
            <FormLabel htmlFor="first_name">First name</FormLabel>
            <Input
              type="text"
              id="first_name"
              name="first_name"
              placeholder="Name"
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
          <Button
            bg="black" // add black background here
            color="white" // keep white text color here
            size="lg"
            mt={4}
            width="100%"
            type="submit"
          >
            Create Account
          </Button>
          <Text mt={4}>
            Return to Login? <Link href="/"> Click here</Link>
          </Text>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
