//Позволяет сохранять / получать данные игрока из/в sessionStorage
export function setSessionStorage(userData) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

export function getSessionStorage() {
    let userData = {};
    try {
        userData = sessionStorage.getItem('userData');
        return JSON.parse(userData);
    } catch (e) {
        userData.name = '';
        return userData;
    }


}