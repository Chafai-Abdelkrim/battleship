const ship = (len) => {
    const length = len;
    const cells = Array.from({ length }, () => false);

    const hit = (hitIndex) => {
        cells[hitIndex] = true;
    };

    const isSunk = () => {
        return cells.every((cell) => cell === true);
    };

    return { length, cells, hit, isSunk };
};

export default ship;
