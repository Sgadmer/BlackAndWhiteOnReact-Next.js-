import NumberOfPlayersComponent from "../../components/NumberOfPlayers/NumberOfPlayers.js";
import { objectFromURL } from "../../components/encodeDecodeURL/encodeDecodeURL.js";



export default function NumberOfPlayersPage({ userData }) {

    return (
        <>
            <NumberOfPlayersComponent userData={userData} />
        </>
    )
}

export async function getServerSideProps(context) {

    let userData = objectFromURL(context.query.user);

    return {
        props: { userData },
    }
}