function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = (list) => {
    const shuffled = [];
    while (list.length > 0) {
        const randomIndex = getRandomInt(list.length);
        shuffled.push(list.splice(randomIndex, 1)[0]);
    }

    return shuffled;
}