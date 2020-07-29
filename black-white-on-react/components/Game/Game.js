import Loader from "./loader";

export default function GameComponent({ userData }) {

    console.log(userData);



    return (
        <>
            <Loader loadText='load text'/>
        </>
    )
}