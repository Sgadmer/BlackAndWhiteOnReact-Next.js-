function randomInteger (min = 1, max = 100) {
    let rand1 = min + Math.random() * (max + 1 - min);
    let rand2 = min + Math.random() * (max + 1 - min);

    return Math.floor(rand1 + rand2) * 100;
}

module.exports = { randomInteger };