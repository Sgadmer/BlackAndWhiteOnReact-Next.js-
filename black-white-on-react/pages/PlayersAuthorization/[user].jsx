import LoginForm from "../../components/loginForm/loginForm";

export default function LoginPage({ roomID }) {
  return <LoginForm roomID={roomID} />;
}

export async function getServerSideProps(context) {
  return {
    props: { roomID: context.query.user },
  };
}
