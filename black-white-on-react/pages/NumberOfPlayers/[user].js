import { useRouter } from "next/router";
import NumberOfPlayersComponent from "../../components/NumberOfPlayers/NumberOfPlayers.js";



export default function NumberOfPlayersPage() {

    const router = useRouter();



    return (
        <>
            <NumberOfPlayersComponent router={router} />
        </>
    )
}

