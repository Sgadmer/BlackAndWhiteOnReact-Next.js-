import { useRouter } from "next/router";
import LeadersChoiceComponent from "../../components/LeadersChoice/LeadersChoice";



export default function LeadersChoicePage() {

    const router = useRouter();

    return (
        <>
            <LeadersChoiceComponent router={router}/>
        </>
    )
}