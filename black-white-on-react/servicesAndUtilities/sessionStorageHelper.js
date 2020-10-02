export function setSessionStorage(userData) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

export function getSessionStorage() {
    let userData = sessionStorage.getItem('userData');;
    return JSON.parse(userData);
}