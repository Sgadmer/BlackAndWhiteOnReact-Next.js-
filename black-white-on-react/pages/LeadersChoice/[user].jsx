import LeadersChoiceComponent from "../../components/LeadersChoice/LeadersChoice";
import { objectFromURL } from "../../components/encodeDecodeURL/encodeDecodeURL";



export default function LeadersChoicePage({userData}) {


    return (
        <>
            <LeadersChoiceComponent  userData={userData} />
        </>
    )
}

export async function getServerSideProps(context) {

    let userData = objectFromURL(context.query.user);

    return {
        props: { userData },
    }
}