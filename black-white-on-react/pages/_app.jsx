import "../styles/nullStyle.scss";
import "../styles/app.scss";
import { SocketProvider } from "../servicesAndUtilities/SocketContext";

function MyApp({ Component, pageProps }) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;
