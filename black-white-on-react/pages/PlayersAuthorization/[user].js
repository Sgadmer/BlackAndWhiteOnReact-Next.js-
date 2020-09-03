import LoginForm from "../../components/loginForm/loginForm";
import { objectFromURL } from "../../components/encodeDecodeURL/encodeDecodeURL";


export default function LoginPage({ userData }) {
    return (
        <>
            <LoginForm userData={userData} />
        </>
    )
}


export async function getServerSideProps(context) {
    let userData = objectFromURL(context.query.user);
    return {
        props: { userData },
    }
}