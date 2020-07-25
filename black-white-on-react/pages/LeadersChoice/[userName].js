import { useRouter } from "next/router";
import { DecodeURL } from "../../components/encodeDecodeURL/encodeDecodeURL";



export default function LeadersChoice() {

    const router = useRouter();
    let userName = DecodeURL(router.query.userName);
  
    let regexp = /name=([^&]+)/i;
    if (!!regexp.exec(userName))
        userName = regexp.exec(userName)[1];
    

    
    return (
        <>
            <input value={userName}></input>
        </>
    )
}