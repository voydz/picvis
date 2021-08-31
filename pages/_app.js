import UserProvider from '../context/userContext'
import '../firebase/createApp'

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
