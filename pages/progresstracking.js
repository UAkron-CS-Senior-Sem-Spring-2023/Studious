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