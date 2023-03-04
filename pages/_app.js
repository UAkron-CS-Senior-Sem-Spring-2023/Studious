import '@/styles/globals.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'next-auth/react'

export default function App({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}
