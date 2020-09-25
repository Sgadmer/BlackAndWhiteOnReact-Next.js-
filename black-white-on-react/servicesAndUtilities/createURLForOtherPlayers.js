export default function createURLforOtherPlayers(roomIdMD5) {
    let URL = document.location.href.split('/');

    URL.pop();
    URL.push('PlayersAuthorization');
    URL.push(roomIdMD5);
    URL = URL.join('/');

    return URL;
}