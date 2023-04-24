// import Head from "next/head";
// import Link from "next/link";
// import FullCalendar from "@fullcalendar/react"; // must go before plugins
// import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
// import LoginSignupForm from "./login";
// import styles from "@/styles/Home.module.css";
// import { useEffect, useState } from "react";
// import {
//   Box,
//   Heading,
//   Text,
//   Image,
//   Flex,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Avatar,
//   FormControl,
//   FormLabel,
//   Input,
//   Checkbox,
//   Select,
//   Button,
// } from "@chakra-ui/react";
// import { MdCheckCircle, MdErrorOutline } from "react-icons/md";

// // check if the user is logged in- if not redirect them to the login page
// function CheckForLogin() {
//   const [email, setEmail] = useState(null);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       if (localStorage.getItem("email") === null) {
//         window.location.href = "/login";
//       } else {
//         setEmail(localStorage.getItem("email"));
//       }
//     }
//   }, []);
// }

// function TaskList() {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     async function fetchTasks() {
//       const response = await fetch("/api/tasks");
//       const data = await response.json();
//       setTasks(data);
//     }

//     fetchTasks();
//   }, []);

//   const taskIconColor = useColorModeValue("green.500", "green.200");

//   return (
//     <Box p={4}>
//       <Heading as="h2" size="lg" mb={4}>
//         Tasks
//       </Heading>
//       {tasks.length === 0 && (
//         <Text>No tasks yet.</Text>
//       )}
//       {tasks.length > 0 && (
//         <List spacing={3}>
//           {tasks.map((task) => (
//             <ListItem key={task.id}>
//               <ListIcon as={task.completed ? MdCheckCircle : MdErrorOutline} color={taskIconColor} />
//               <Text as="span" textDecoration={task.completed ? "line-through" : "none"}>
//                 {task.name}
//               </Text>
//             </ListItem>
//           ))}
//         </List>
//       )}
//     </Box>
//   );
// }

// function Calendar() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     async function fetchEvents() {
//       const response = await fetch("/api/events");
//       const data = await response.json();
//       setEvents(data);
//     }

//     fetchEvents();
//   }, []);

//   const eventBorderColor = useColorModeValue("green.500", "green.200");

//   return (
//     <Box p={4}>
//       <Heading as="h2" size="lg" mb={4}>
//         Calendar
//       </Heading>
//       <FullCalendar
//         plugins={[dayGridPlugin]}
//         initialView="dayGridMonth"
//         events={events.map((event) => ({
//           id: event.id,
//           title: event.title,
//           start: new Date(event.start),
//           end: new Date(event.end),
//           backgroundColor: event.color,
//           borderColor: eventBorderColor,
//         }))}
//       />
//     </Box>
//   );
// }

// export default function Dashboard() {
//   return (
//     <Flex flexDirection={{ base: "column", md: "row" }}>
//       <Box w={{ base: "100%", md: "70%" }}>
//         <TaskList />
//       </Box>
//       <Box w={{ base: "100%", md: "30%" }}>
//         <Calendar />
//       </Box>
//     </Flex>
//   );
// }
