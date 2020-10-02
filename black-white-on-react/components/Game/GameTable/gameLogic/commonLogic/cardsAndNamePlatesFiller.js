// ф-ия для заполнения карт и табличек имён информацией
function UserTableName({ userData, i, names }) {
    switch (i) {
        case 0:
            return userData.name;
        case 1:
            return names[0];
        case 2:
            return names[1];
        case 3:
            return names[2];
        default:
            return '';
    }
}

function setUserName(userData, i, names) {
    switch (i) {
        case 0:
        case 1:
            return userData.name;
        case 2:
        case 3:
            return names[0];
        case 4:
        case 5:
            return names[1];
        case 6:
        case 7:
            return names[2];
        default:
            return '';
    }
}

function CardText({ i, card1, card2 }) {
    let text =
        (i == 0) ? card1 :
            (i == 1) ? card2 : ''

    return text;
}

function setCardPosition(i) {

    return ((i + 1) % 2 == 0) ? 2 : 1
}


export { UserTableName, setUserName, CardText, setCardPosition }