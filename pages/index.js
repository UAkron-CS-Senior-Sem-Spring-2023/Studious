import Head from "next/head";
import Link from "next/link";
import LoginSignupForm from "./login";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Image, Flex, Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";

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

// displays the schedule
function DisplaySchedule() {
  const [classEntries, setClassEntries] = useState([]);

  // get the email address of the user
  useEffect(() => {
    let email = localStorage.getItem("email");
    
    // build the query for the API
    const queryString = `/api/classes?email=${email}`;

    fetch(queryString)
      .then(response => response.json())
      .then(data => setClassEntries(data.data))
      .catch(error => console.error(error))
  }, []);

  function formatTime(timeString) {
    const dateObj = new Date(timeString);
    let hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    let timeOfDay = "";

    if (hours > 12) {
      hours-=12;
      timeOfDay = "PM";
    } else {
      timeOfDay = "AM";
    }

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`

    return `${hours}:${formattedMinutes} ${timeOfDay}`
  }

  // display the results
  return (
    <div>
      {classEntries.map(entry => (
        <div key={entry._id}>
          <h2><b>{entry.className}</b></h2>
          <p>{entry.classLocation}</p>
          <p>Start time: {formatTime(entry.startTime)} </p>
          <p>End time: {formatTime(entry.endTime)}</p>
          <p>{entry.days.join(", ")}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

function ProfileTab() {

  // logout function
  const logoutFunc = () => {
    if (typeof window !== "undefined") {
      // remove the 'email' and 'first_name' fields from local storage
      localStorage.removeItem('email');
      localStorage.removeItem('first_name');

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
  )
}

export default function Home() {
      // redirects to the home page
    function redirectAddClass() {
      window.location.href = '/add_class';
    }

    function redirectAddTask() {
      window.location.href = 'add_task';
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

      <Flex minH="100vh" flexDirection="column">
        <Flex flex={1}>
          {/* Sidebar */}
          <Box bg="gray.200" p={4} w="14%" h="100vh" rounded="xl">
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
              onClick={ redirectAddClass }
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
              onClick={ redirectAddTask }
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

          <Box bg="white" p={4} w="86%">
            <ProfileTab/>
            <DisplaySchedule />
          </Box>
        </Flex>
        <Box bg="gray.200" p={4}>
          <Text align="center">© 2023 Studious. All rights reserved.</Text>
        </Box>
      </Flex>
    </>
  );
}
