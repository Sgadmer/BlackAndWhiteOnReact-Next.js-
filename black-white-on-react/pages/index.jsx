import LoginForm from '../components/loginForm/loginForm.jsx';
import { objectFromURL } from '../components/encodeDecodeURL/encodeDecodeURL.js';

export default function LoginPage({ userData }) {
    return (
        <>
            <LoginForm userData={userData} />
        </>
    )
}



export async function getServerSideProps(context) {
    let userData = {};

    if (context.query.user) {
        userData = objectFromURL(context.query.user);
    }


    return {
        props: { userData },
    }
}