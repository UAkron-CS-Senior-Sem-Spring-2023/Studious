import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import LoginSignupForm from './login'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react';


// check if the user is logged in- if not redirect them to the login page
function CheckForLogin() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('email') === null) {
        window.location.href = '/login';
      } else {
        setEmail(localStorage.getItem('email'));
      }
    }
  }, []);

  if (email) {
    return <h1>{email}</h1>;
  } else {
    return null;
  }
}

// returns the email
function DisplayEmail() {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setEmail(localStorage.getItem('email'));
    }
  }, []);

  if (email) {
    return <h1>{email}</h1>;
  } else {
    return null;
  }
}

// displays the schedule
function DisplaySchedule() {

}

export default function Home() {
  return (
    <>
      <Head>
        <title>Studious</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/studious-website-favicon-black.png" />
      </Head>
      <main className={styles.main}>
        <Image
          src="/studioustransparent.png"
          width={150}
          height={75}
        />
        
        {/* On load, check if the user is logged in. If they are not, redirect them to the login page, which will redirect them back here after they login */}
        <CheckForLogin />
        <DisplaySchedule />

      </main>
    </>
  )
}