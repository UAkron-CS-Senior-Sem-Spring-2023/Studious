import Head from "next/head";
import Link from "next/link";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
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


function DisplaySchedule() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    let email = localStorage.getItem("email");
    
    const queryString = `/api/classes?email=${email}`;

    fetch(queryString)
      .then(response => response.json())
      .then(data => {
        const events = data.data.map(entry => {
          return {
            title: entry.className,
            start: entry.startDate,
            end: entry.endDate,
            backgroundColor: '#f0ad4e'
          };
        });
        setEvents(events);
      })
      .catch(error => console.error(error))
  }, []);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
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

      <Flex minH="100vh" flexDirection="column" bgGradient='linear(blue.100 0%, blue.50 25%, white.100 50%)'>
        <Flex flex={1}>
          {/* Sidebar */}
          <Box p={4}  h="100vh" rounded="xl" >
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

          <Box p={4} w='82%' >
            <ProfileTab/>
            <DisplaySchedule />
          </Box>
        </Flex>
        <Box p={4}>
          <Text align="center">© 2023 Studious. All rights reserved.</Text>
        </Box>
      </Flex>
    </>
  );
}
