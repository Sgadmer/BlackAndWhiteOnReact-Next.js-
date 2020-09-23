import '../styles/nullStyle.scss';
import '../styles/app.scss';
import { SocketProvider } from './SocketContext/SocketContext';


function MyApp({ Component, pageProps }) {
    return (
        <SocketProvider>
            <Component {...pageProps} />
        </SocketProvider>
    )
}

export default MyApp