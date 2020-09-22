import { objectFromURL } from "../../components/encodeDecodeURL/encodeDecodeURL";
import GameComponent from "../../components/Game/Game";

export default function GamePage({ userData }) {


    return (
        <>
            <GameComponent userData={userData} />
        </>
    )
}


export async function getServerSideProps(context) {

    let userData = objectFromURL(context.query.user);

    return {
        props: { userData },
    }
}