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
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </Head>
      <div className={'rotateDevice'}>Пожалуйста, переверните устройство</div>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;
