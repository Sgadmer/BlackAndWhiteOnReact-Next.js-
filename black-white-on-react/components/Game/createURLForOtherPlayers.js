import { objectToURL } from "../encodeDecodeURL/encodeDecodeURL";

export default function createURLforOtherPlayers(userData) {
    let URL = document.location.href.split('/');
    URL.pop();
    URL.push(objectToURL(userData));
    URL = URL.join('/');
    return URL;
}