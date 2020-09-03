import { objectToURL } from "../encodeDecodeURL/encodeDecodeURL";

export default function createURLforOtherPlayers(userData) {
    let URL = document.location.href.split('/');
    
    URL.pop();
    URL.pop();
    URL.push('PlayersAuthorization');
    URL.push(objectToURL(userData));
    URL = URL.join('/');
    console.log(URL);

    return URL;
}