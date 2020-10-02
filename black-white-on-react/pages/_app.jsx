import "../styles/nullStyle.scss";
import "../styles/app.scss";
import { SocketProvider } from "../servicesAndUtilities/SocketContext";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <SocketProvider>
      <Head>
        <title>Black and White</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;
