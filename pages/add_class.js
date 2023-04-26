import Head from "next/head";
import Link from "next/link";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import LoginSignupForm from "./login";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Select,
  Button,
  Center,
} from "@chakra-ui/react";

// check if the user is logged in- if not redirect them to the login page
function CheckForLogin() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("email") === null) {
        window.location.href = "/login";
      } else {
        setEmail(localStorage.getItem("email"));
      }
    }
  }, []);
}

// add a class to the database
const addClass = async (event) => {
  event.preventDefault();

  // get the data from the form
  const className = event.target.class_name.value;
  const location = event.target.location.value;
  const startTime = event.target.start_time.value;
  const endTime = event.target.end_time.value;
  const email = localStorage.getItem("email");
  const color = event.target.color.value;

  // create an array of selected days
  let selectedDays = [];
  let daysOfWeek = document.getElementsByName("days");

  /*if (days) {
    // check that days is not null or undefined
    console.log(days);
    for (let i = 0; i < days.length; i++) {
      if (days[i].checked) {
        selectedDays.push(days[i].value);
      }
    }
  } else {
    // handle error if days is null or undefined
    alert("Error: days is not defined or is null");
  }*/
  daysOfWeek.forEach((day) => {
    if (day.checked) {
      selectedDays.push(day.value);
    }
  });

  const data = {
    className: className,
    classLocation: location,
    userEmail: email,
    startTime: new Date(`1970-01-01 ${startTime}:00`),
    endTime: new Date(`1970-01-01 ${endTime}:00`),
    days: selectedDays,
    color: color,
  };

  console.log(data);

  try {
    // make a POST request to the API to add the class
    const response = await fetch("/api/classes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      // handle error if response is not ok
      throw new Error("Error adding class");
    }

    // refresh the page to display the new class
    //window.location.reload();
  } catch (error) {
    console.log(error);
    alert("Error adding class");
  }
};

function ProfileTab() {
  // logout function
  const logoutFunc = () => {
    if (typeof window !== "undefined") {
      // remove the 'email' and 'first_name' fields from local storage
      localStorage.removeItem("email");
      localStorage.removeItem("first_name");

      // reload the page- this will take the user to the home page
      window.location.reload();
    }
  };

  return (
    <Box position="absolute" top="4" right="4">
      <Menu>
        <MenuButton
          as={Avatar}
          size="md"
          p="4"
          name="John doe" /*Display their First Name from database*/
          src=""
          bg="gray.200"
          transition="border 0.5s ease"
          _hover={{
            border: "1px solid black",
            cursor: "pointer",
          }}
        />
        <MenuList>
          <MenuItem>My Profile</MenuItem> {/*Link to account home*/}
          <MenuItem>Settings</MenuItem> {/*Link to account settings*/}
          <MenuItem onClick={logoutFunc}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}

export default function Home() {
  // redirects to the home page
  function sendHome() {
    window.location.href = "/";
  }

  function redirectAddTask() {
    window.location.href = "add_task";
  }

  return (
    <>
      <Head>
        <title>Studious</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/studious-website-favicon-black.png" />
      </Head>

      {/* On load, check if the user is logged in. If they are not, redirect them to the login page, which will redirect them back here after they login */}
      <CheckForLogin />

      <Flex
        minH="100vh"
        flexDirection="column"
        bgGradient="linear(blue.100 0%, blue.50 25%, white.100 50%)"
      >
        <Flex flex={1}>
          {/* Sidebar */}
          <Box p={4} h="100vh" rounded="xl">
            <Link href="/">
              <Image
                alignContent="center"
                href="/"
                src="/studioustransparent.png"
                width={150}
                height={75}
                marginLeft="3"
              />
            </Link>
            <Box
              border="1px solid black"
              rounded="md"
              p={4}
              marginTop={10}
              textAlign="center"
              transition="background-color 0.5s ease"
              _hover={{
                bg: "#718096",
                cursor: "pointer",
              }}
              onClick={sendHome}
            >
              Home
            </Box>

            <Box
              border="1px solid black"
              rounded="md"
              p={4}
              marginTop={10}
              textAlign="center"
              transition="background-color 0.5s ease"
              _hover={{
                bg: "#718096",
                cursor: "pointer",
              }}
              onClick={redirectAddTask}
            >
              Add Task
            </Box>
{/* 
            <Box
              border="1px solid black"
              rounded="md"
              p={4}
              marginTop={10}
              textAlign="center"
              transition="background-color 0.5s ease"
              _hover={{
                bg: "#718096",
                cursor: "pointer",
              }}
            >
              Progress Tracking
            </Box> */}
          </Box>

          {/* Main content goes here */}

          <Box p={4} w="82%" mt={8}>
            <ProfileTab />

            <Heading as="h1" size="2xl" mb="4">
              Add Class
            </Heading>

            <form onSubmit={addClass}>
              <FormControl id="class_name" isRequired>
                <FormLabel>Class Name</FormLabel>
                <Input type="text" placeholder="Enter class name" />
              </FormControl>

              <FormControl id="location" isRequired mt="4">
                <FormLabel>Location</FormLabel>
                <Input type="text" placeholder="Enter class location" />
              </FormControl>

              <FormControl id="start_time" isRequired mt="4">
                <FormLabel>Start Time</FormLabel>
                <Input type="time" />
              </FormControl>

              <FormControl id="end_time" isRequired mt="4">
                <FormLabel>End Time</FormLabel>
                <Input type="time" />
              </FormControl>

              <FormControl id="days_of_week" mt="4">
                <FormLabel>Days of the week</FormLabel>
                <Flex>
                  <Checkbox value="Monday" name="days" mr="2">
                    Monday
                  </Checkbox>
                  <Checkbox value="Tuesday" name="days" mr="2">
                    Tuesday
                  </Checkbox>
                  <Checkbox value="Wednesday" name="days" mr="2">
                    Wednesday
                  </Checkbox>
                  <Checkbox value="Thursday" name="days" mr="2">
                    Thursday
                  </Checkbox>
                  <Checkbox value="Friday" name="days" mr="2">
                    Friday
                  </Checkbox>
                  <Checkbox value="Saturday" name="days" mr="2">
                    Saturday
                  </Checkbox>
                  <Checkbox value="Sunday" name="days" mr="2">
                    Sunday
                  </Checkbox>
                </Flex>
              </FormControl>

              <FormControl id="color" isRequired mt="4">
                <FormLabel>Color</FormLabel>
                <Select placeholder="Select color">
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="orange">Orange</option>
                  <option value="yellow">Yellow</option>
                </Select>
              </FormControl>

              <Button
                type="submit"
                bg="black" // add black background here
                color="white"
                mt="4"
              >
                Add Class
              </Button>
            </form>
          </Box>
        </Flex>
        <Box p={4}>
          <Center bg="#718096" h="50px" color="white">
            "Happiness is not something ready made. It comes from your own
            actions.” ―Dalai Lama XIV
          </Center>
          <Text align="center">© 2023 Studious. All rights reserved.</Text>
        </Box>
      </Flex>
    </>
  );
}
