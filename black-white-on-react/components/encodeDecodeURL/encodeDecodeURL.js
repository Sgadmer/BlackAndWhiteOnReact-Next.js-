import NxBase64 from 'next-base64';

export function objectToURL(obj) {
    return EncodeURL(JSON.stringify(obj));
}

export function objectFromURL(url) {
    return JSON.parse(DecodeURL(url));
}

export function EncodeURL(str) {
    return NxBase64.encode(unescape(encodeURIComponent(str)));
}


export function DecodeURL(str) {
    return decodeURIComponent(escape(NxBase64.decode(str)));
}

