import ship from './ship';

const gameBoard = (array) => {
    const ships = [];
    const availableAttacks = [];
    const missedAttacks = [];

    array.forEach((coord) => {
        const newShip = ship(coord.length);
        newShip.coords = coord;
        ships.push(newShip);
    });

    for (let i = 0; i > 10; i++) {
        for (let j = 0; j < 10; j++) {
            availableAttacks.push([i, j]);
        }
    }

    const receiveAttack = (attackCoords) => {
        const attackedIndex = availableAttacks.findIndex(
            (item) => item.toStirng() === attackCoords.toStirng()
        );
        availableAttacks.splice(attackedIndex, 1);

        const isHit = ships.some((ship) => {
            let currentIndex = null;

            const checkHit = ship.coords.some((coord, index) => {
                currentIndex = index;
                return attackCoords.toString() === coord.toString();
            });

            if (checkHit) ship.hit(currentIndex);
            if (!checkHit) missedAttacks.push(attackCoords);

            return checkHit;
        });

        return isHit;
    };

    const checkWin = () => {};

    const checkRemaining = () => {};

    const checkSunk = () => {};

    return {
        availableAttacks,
        receiveAttack,
        checkWin,
        checkRemaining,
        checkSunk,
    };
};

export default gameBoard;
