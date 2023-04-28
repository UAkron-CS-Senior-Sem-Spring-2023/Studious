import Head from "next/head";
import Link from "next/link";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
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
  Center,
  Button,
} from "@chakra-ui/react";
// import { useEffect, useState } from "react";

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

/*

function DailyQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {

    // function to fetch a quote from an API or list of quotes
    async function fetchQuote() {
      const response = await fetch("https://...");
      const data = await response.json();
      setQuote(data.content);
    }

    // fetch a new quote every day at midnight
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight.getTime() - new Date().getTime();
    const timer = setTimeout(() => {
      fetchQuote();
    }, timeUntilMidnight);

    // fetch a quote immediately before going out of scope
    fetchQuote();

    // clear the timer when out of scope
    return () => clearTimeout(timer);
  }, []);

  return <p>{quote}</p>;
}

*/

function ouputQuote(color, text) {
  return '<span style="color:' + color + '">' + text + "</span>";
}

function DisplaySchedule() {
  const [events, setEvents] = useState([]);


  // adding the tasks here
  useEffect(() => {
    const email = localStorage.getItem("email");

    fetch(`/api/tasks?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        const taskEvents = data.data.map((task) => ({
          title: task.TaskName,
          start: task.startDate,
          end: task.endDate,
          backgroundColor: "#f0ad4e",
        }));

        for (let i = 0; i < data.data.length; i++) {
          //console.log(data.data);
          const currEvent = {
            title: data.data[i].TaskName,
            start: data.data[i].startTime,
            end: data.data[i].endTime,
            backgroundColor: data.data[i].color,
          };
          events.push(currEvent);
        }

        console.log(events);
        const updatedEvents = [...events, ...taskEvents];

        setEvents(updatedEvents);
      })
      .catch((error) => console.error(error));

      //let email = localStorage.getItem("email");
    const queryString = `/api/classes?email=${email}`;

    setTimeout(function() {
    }, 1000); // 1000 milliseconds = 1 second

    fetch(queryString)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const events = data.data.map((entry) => {
          return {
            title: entry.className,
            start: entry.startDate,
            end: entry.endDate,
            backgroundColor: "#f0ad4e",
          };
        });

        for (let i = 0; i < data.data.length; i++) {
          // getting the class
          const entry = data.data[i];
          let classColor = data.data[i].color;

          // for all days that this current entry occurs
          for (let j = 0; j < entry.days.length; j++) {
            // TODO: create events for all days this month
            const year = 2023;
            const month = 3; // JavaScript months are zero-indexed, so April is month 3
            const dayOfWeekString = entry.days[j];

            // associative array for the days of the week
            const dayChart = {
              Sunday: 0,
              Monday: 1,
              Tuesday: 2,
              Wednesday: 3,
              Thursday: 4,
              Friday: 5,
              Saturday: 6,
            };

            const dayOfWeek = dayChart[dayOfWeekString]; // Monday is day 1 of the week (Sunday is 0): will need to convert the days array to this value

            const dates = [];

            const date = new Date(year, month, 1);
            while (date.getMonth() === month) {
              if (date.getDay() === dayOfWeek) {
                dates.push(new Date(date));
              }
              date.setDate(date.getDate() + 1);
            }

            // for each of these, create the event for the class and push it to the schedule
            for (let x = 0; x < dates.length; x++) {
              console.log("this is dates[x]", dates[x])
              const dateObject = new Date(dates[x]);
              const today = new Date();

              // get the hours and minutes for the start and end times from the entry array

              // create the name string for the entry, which will have the times
              const classStart = entry.startTime;
              const classEnd = entry.endTime;
              const startDate = new Date(classStart);
              const endDate = new Date(classEnd);

              const startHours =
                startDate.getHours() > 12
                  ? startDate.getHours() - 12
                  : startDate.getHours();
              const endHours =
                endDate.getHours() > 12
                  ? endDate.getHours() - 12
                  : endDate.getHours();
              // const buildClassName = `${
              //   entry.className
              // } (${startHours}:${startDate.getMinutes()} - ${endHours}:${endDate.getMinutes()})`;
              const buildClassName = `${entry.className}`

              //console.log("entry entry:", startDate.getHours());

              console.log("this is date object", dateObject);

              // creating a final start and end date for 
              const classStartDate = dateObject;
              const classEndDate = dateObject;

              classStartDate.setHours(startDate.getHours());
              classStartDate.setMinutes(startDate.getMinutes());
              classEndDate.setHours(endDate.getHours());
              classEndDate.setMinutes(endDate.getMinutes());

              // get the color of the class

              const currEvent = {
                title: buildClassName,
                start: classStartDate,
                end: classEndDate,
                backgroundColor: classColor,
              };

              console.log("write this to calendar: ", currEvent);

              setEvents((prevEvents) => [...prevEvents, currEvent]);
            }
          }
        }

        // load the task items into the calendar
        //setEvents(events);
      })
      .catch((error) => console.error(error));
  }, []);



  /*useEffect(() => {
    let email = localStorage.getItem("email");
    const queryString = `/api/classes?email=${email}`;

    fetch(queryString)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const events = data.data.map((entry) => {
          return {
            title: entry.className,
            start: entry.startDate,
            end: entry.endDate,
            backgroundColor: "#f0ad4e",
          };
        });

        for (let i = 0; i < data.data.length; i++) {
          // getting the class
          const entry = data.data[i];

          // for all days that this current entry occurs
          for (let j = 0; j < entry.days.length; j++) {
            // TODO: create events for all days this month
            const year = 2023;
            const month = 3; // JavaScript months are zero-indexed, so April is month 3
            const dayOfWeekString = entry.days[j];

            // associative array for the days of the week
            const dayChart = {
              Sunday: 0,
              Monday: 1,
              Tuesday: 2,
              Wednesday: 3,
              Thursday: 4,
              Friday: 5,
              Saturday: 6,
            };

            const dayOfWeek = dayChart[dayOfWeekString]; // Monday is day 1 of the week (Sunday is 0): will need to convert the days array to this value

            const dates = [];

            const date = new Date(year, month, 1);
            while (date.getMonth() === month) {
              if (date.getDay() === dayOfWeek) {
                dates.push(new Date(date));
              }
              date.setDate(date.getDate() + 1);
            }

            // for each of these, create the event for the class and push it to the schedule
            for (let x = 0; x < dates.length; x++) {
              console.log("this is dates[x]", dates[x])
              const dateObject = new Date(dates[x]);
              const today = new Date();

              // get the hours and minutes for the start and end times from the entry array

              // create the name string for the entry, which will have the times
              const classStart = entry.startTime;
              const classEnd = entry.endTime;
              const startDate = new Date(classStart);
              const endDate = new Date(classEnd);

              const startHours =
                startDate.getHours() > 12
                  ? startDate.getHours() - 12
                  : startDate.getHours();
              const endHours =
                endDate.getHours() > 12
                  ? endDate.getHours() - 12
                  : endDate.getHours();
              // const buildClassName = `${
              //   entry.className
              // } (${startHours}:${startDate.getMinutes()} - ${endHours}:${endDate.getMinutes()})`;
              const buildClassName = `${entry.className}`

              //console.log("entry entry:", startDate.getHours());

              console.log("this is date object", dateObject);

              // creating a final start and end date for 
              const classStartDate = dateObject;
              const classEndDate = dateObject;

              classStartDate.setHours(startDate.getHours());
              classStartDate.setMinutes(startDate.getMinutes());
              classEndDate.setHours(endDate.getHours());
              classEndDate.setMinutes(endDate.getMinutes());

              const currEvent = {
                title: buildClassName,
                start: classStartDate,
                end: classEndDate,
                backgroundColor: "#f0ad4e",
              };

              console.log("write this to calendar: ", currEvent);

              setEvents((prevEvents) => [...prevEvents, currEvent]);
            }
          }
        }

        // load the task items into the calendar
        //setEvents(events);
      })
      .catch((error) => console.error(error));
  }, []); */

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        initialView="timeGridWeek"
        defaultView="timeGridWeek"
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
          name="" /*Display their First Name from database*/
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
  function redirectAddClass() {
    window.location.href = "/add_class";
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
              onClick={redirectAddClass}
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
                bg: "#718096",
                cursor: "pointer",
              }}
              onClick={redirectAddTask}
            >
              Add Task
            </Box>

            {/* <Box
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

          <Box p={4} w="82%">
            <ProfileTab />
            <DisplaySchedule />
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
