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

// add a task to the database
const addTask = async (event) => {

  event.preventDefault();

  // get the data from the form
  
  const taskName = event.target.task_name.value;
  const taskDescription = event.target.task_description.value;
  const taskTime =
    parseInt(event.target.taskHours.value) +
    parseFloat(event.target.taskFraction.value);
  const userEmail = localStorage.getItem("email");
  const priorityLevel = event.target.priority_level.value;
  const color = event.target.color.value;

  // build the JSON for the initial task creation request
  const data = {
    TaskName: taskName,
    taskDescription: taskDescription,
    taskPriority: priorityLevel,
    userEmail: userEmail,
    startTime: new Date(0),
    endTime: new Date(0),
    color: color,
    timeEstimate: taskTime,
  };

  const JSONdata = JSON.stringify(data);
  const endpoint = "/api/tasks";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSONdata,
  };

  const response = await fetch(endpoint, options);
  const result = await response.json();
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

  function redirectAddClass() {
    window.location.href = "add_class";
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
                bg: "white",
                cursor: "pointer",
              }}
              onClick={sendHome}
            >
              Add Class
            </Box>

            <Box
              border="1px solid black"
              rounded="md"
              p={4}
              marginTop={10}
              textAlign="center"
              transition="background-color 0.5s ease"
              _hover={{
                bg: "white",
                cursor: "pointer",
              }}
              onClick={redirectAddClass}
            >
              Add Task
            </Box>

            <Box
              border="1px solid black"
              rounded="md"
              p={4}
              marginTop={10}
              textAlign="center"
              transition="background-color 0.5s ease"
              _hover={{
                bg: "white",
                cursor: "pointer",
              }}
            >
              Progress Tracking
            </Box>
          </Box>

          {/* Main content goes here */}

          <Box p={4} w="82%" mt="8">
            <ProfileTab />

            <Heading as="h1" size="2xl" mb="4">
              My Schedule
            </Heading>

            <form onSubmit={addTask}>
              <FormControl isRequired>
                <FormLabel htmlFor="task_name">Task name</FormLabel>
                <Input
                  type="text"
                  id="task_name"
                  name="task_name"
                  placeholder="task_name"
                />
              </FormControl>

              <FormControl mt="4" isRequired>
                <FormLabel htmlFor="task_description">
                  Task description
                </FormLabel>
                <Input
                  type="text"
                  id="task_description"
                  name="task_description"
                  placeholder="Task description"
                />
              </FormControl>

              <FormControl mt="4" isRequired>
                <FormLabel htmlFor="taskHours">
                  Estimated time (hours):
                </FormLabel>
                <Box display="flex">
                  <Select
                    id="taskHours"
                    name="taskHours"
                    mr="2"
                  >
                    {[...Array(13).keys()].map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </Select>

                  <Select
                    id="taskFraction"
                    name="taskFraction"
                  >
                    <option value="0">0</option>
                    <option value="0.25">25</option>
                    <option value="0.5">5</option>
                    <option value="0.75">75</option>
                  </Select>
                </Box>
              </FormControl>

              <FormControl mt="4" isRequired>
                <FormLabel htmlFor="priority_level">Priority Level:</FormLabel>
                <Select
                  id="priority_level"
                  name="priority_level"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Select>
              </FormControl>

              <FormControl mt="4" isRequired>
                <FormLabel htmlFor="color">Color:</FormLabel>
                <Select
                  id="color"
                  name="color"
                >
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                </Select>
              </FormControl>

              <Button mt="4" colorScheme="blue" type="submit">
                Create Task
              </Button>
            </form>
          </Box>
        </Flex>
        <Box p={4}>
          <Text align="center">© 2023 Studious. All rights reserved.</Text>
        </Box>
      </Flex>
    </>
  );
}
