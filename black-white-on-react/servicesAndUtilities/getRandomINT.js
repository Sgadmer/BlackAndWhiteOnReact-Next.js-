function randomInteger(min = 101, max = 100000) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let rand = Math.floor(Math.random() * (max - min)) + min;
    rand = rand - (rand % 10);
    return rand;
}

module.exports = { randomInteger };