import Head from "next/head";
import Link from "next/link";
import LoginSignupForm from "./login";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { Box, Heading, Text, Image, Flex, Menu, MenuButton, MenuList, MenuItem, Avatar } from "@chakra-ui/react";
import cx from 'classnames'

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
function DisplaySchedule() {}

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

// add a task to the database
const addTask = async (event) => {
  event.preventDefault();

  // get the data from the form
  const taskName = event.target.task_name.value;
  const taskDescription = event.target.task_description.value;
  const taskTime = parseInt(event.target.taskHours.value) + parseFloat(event.target.taskFraction.value);
  const userEmail = localStorage.getItem('email');
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
  const endpoint = '/api/tasks';

  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSONdata,
    };

  const response = await fetch(endpoint, options);
  const result = await response.json();
}

// add a class to the database
const addClass = async (event) => {
  event.preventDefault(); 

  // get the data from the form
  const className = event.target.class_name.value;
  const location = event.target.location.value;
  const startTime = event.target.start_time.value;
  const endTime = event.target.end_time.value;
  const email = localStorage.getItem('email');
  const color = event.target.color.value;

  // create an array of selected days
  let selectedDays = [];
  let days = document.querySelectorAll('input[type="checkbox"]');

  if (days) {
    // check that days is not null or undefined
    for (let i = 0; i < days.length; i++) {
      if (days[i].checked) {
        selectedDays.push(days[i].value);
      }
    }
  } else {
    // handle error if days is null or undefined
    alert('Error: days is not defined or is null');
  }

  const data = {
    className: className,
    classLocation: location,
    userEmail: email,
    startTime: new Date(`1970-01-01 ${startTime}:00`),
    endTime: new Date(`1970-01-01 ${endTime}:00`),
    days: selectedDays,
    color: color
  }

  const JSONdata = JSON.stringify(data);
  const endpoint = '/api/classes';

  const options = {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSONdata,
    };

  const response = await fetch(endpoint, options);
  const result = await response.json();
  console.log(result);
}

export default function Home() {

    // redirects to the home page
    function sendHome() {
        window.location.href = '/';
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
              onClick={sendHome}
            >
              Home
            </Box>
          </Box>

          {/* Main content goes here */}

          <main className={cx(styles["form-signin"],"text-center","mt-5")} style={{ margin: '30px' }}>
        <br />
        <br />
        <br />
      <form onSubmit={addTask}>

        {/* task name */}
        <div className="form-floating">
          <input type="text" className="form-control" id="task_name" name="task_name" placeholder="Task Name" />
          <label htmlFor="task_name">Task name</label>
        </div>
        <br />


        {/* task description */}
        <div className="form-floating">
          <input type="text" className="form-control" id="task_description" name="task_description" placeholder="Task description" />
          <label htmlFor="task_description">Notes</label>
        </div>
        <br />

        {/* time estimate here */}
        <div>
          <label htmlFor="taskHours">Estimated time (hours):</label>
          <br></br>
          <select id="taskHours" name="taskHours">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>

          <label htmlFor="taskFraction">.</label>
          <select id="taskFraction" name="taskFraction">
            <option value="0">0</option>
            <option value="0.25">25</option>
            <option value="0.5">5</option>
            <option value="0.75">75</option>
          </select>
          <br />
          <br />
        </div>

        {/* priority level */}
        <label htmlFor="priority_level">Priority Level:</label>
        <select id="priority_level" name="priority_level">
            <option value="1">High</option>
            <option value="2">Medium</option>
            <option value="3">Low</option>
        </select>
        <br />

        {/* color of class */}
        <label htmlFor="color">Color:</label>
        <select id="color" name="color">
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
        </select>

        <br />
        <br />
        <button className="w-100 btn btn-lg btn-primary" type="submit">Create Task</button>
      </form>
    </main>

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