// import { useRouter } from "next/router";
import LeadersChoiceComponent from "../../components/LeadersChoice/LeadersChoice";
import { objectFromURL } from "../../components/encodeDecodeURL/encodeDecodeURL";



export default function LeadersChoicePage({userData}) {

    // const router = useRouter();

    return (
        <>
            <LeadersChoiceComponent /*router={router}*/ userData={userData} />
        </>
    )
}

export async function getServerSideProps(context) {

    let userData = objectFromURL(context.query.user);

    return {
        props: { userData },
    }
}