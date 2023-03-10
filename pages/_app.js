import '@/styles/globals.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'next-auth/react'
import * as React from 'react'
import {ChakraProvider} from "@chakra-ui/react"
import {customTheme} from "/styles/customTheme";


export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
      
  )
}
