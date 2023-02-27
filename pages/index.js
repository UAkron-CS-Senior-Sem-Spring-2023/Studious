import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import LoginSignupForm from './login'
import styles from '@/styles/Home.module.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


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
          width={300}
          height={150}
        />
        <LoginSignupForm/>
      </main>
    </>
  )
}

