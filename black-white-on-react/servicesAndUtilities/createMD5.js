import md5 from "md5";

export default function createMD5(socketID) {
    return md5(socketID);
}