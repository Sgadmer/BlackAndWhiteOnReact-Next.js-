export function EncodeURL(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}


export function DecodeURL(str) {
    return decodeURIComponent(escape(window.atob(str)));
}
