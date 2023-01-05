const randomCoords = (length) => {
    const direction = Math.round(Math.random());
    const coords = [];

    if (direction) {
        const x = Math.floor(Math.random() * (10 - length));
        const y = Math.floor(Math.random() * 10);

        for (let i = 0; i < length; i++) {
            coords.unshift([x + i, y]);
        }
    }

    if (!direction) {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * (10 - length));

        for (let i = 0; i < length; i++) {
            coords.push([x, y + i]);
        }
    }

    return coords;
};

const randomShips = () => {
    const shipArray = [randomCoords(5)];

    while (shipArray.length < 5) {
        const newCoords = randomCoords(5 - shipArray.length);

        const unique = newCoords.every((newCoord) => {
            return shipArray.every((ship) => {
                return ship.every(shipCoord => {
                    return shipCoord.toString() !== newCoord.toString();
                })
            })
        });

        if (unique) shipArray.push(newCoords);
    }

    return shipArray;
};

export default randomShips;
