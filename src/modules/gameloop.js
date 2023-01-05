import player from './player';

const gameLoop = (name, shipArray) => {
    let thePlayer = player(name, shipArray);
    let theEnemy = player();
    let delay = false;

    showPlayerShips(player.playerShips);

    const updateTurn = () => {
        const nextPlayer = theEnemy;
        theEnemy = thePlayer;
        thePlayer = nextPlayer;
    };

    const aiNextAttacks = [];

    const aiTurn = () => {
        const randomIndex = Math.floor(
            Math.random() * theEnemy.board.availableAttacks.length
        );
        const randomCoords = theEnemy.board.availableAttacks[randomIndex];
        const attackCoords =
            aiNextAttacks.length > 0 ? aiNextAttacks.shift() : randomCoords;

        const checkCoords = theEnemy.board.availableAttacks.some(
            (item) => item.toString() === attackCoords.toString()
        );

        if (!checkCoords) {
            aiTurn();
            return;
        }

        const attack = thePlayer.attack(theEnemy.board, attackCoords);

        if (attack) {
            aiNextAttacks.push([attackCoords[0] + 1, attackCoords[1]]);
            aiNextAttacks.push([attackCoords[0], attackCoords[1] + 1]);
            aiNextAttacks.push([attackCoords[0] - 1, attackCoords[1]]);
            aiNextAttacks.push([attackCoords[0], attackCoords[1] - 1]);
        }

        delay = true;

        setTimeout(() => {
            updateBoard(attackCoords, attack, thePlayer, theEnemy);

            if (theEnemy.board.checkWin()) {
                gameOver(thePlayer);
                return;
            }

            delay = false;

            if (!attack) updateTurn();
            if (attack) aiTurn();
        }, 250);
    };

    const takeTurn = (coords) => {
        if (delay) return;

        const checkCoords = theEnemy.board.availableAttacks.some(
            (item) => item.toString() === coords.toString()
        );

        if (!checkCoords) return;

        const attack = thePlayer.attack(theEnemy.board, coords);

        updateBoard(coords, attack, thePlayer, theEnemy);

        if (theEnemy.board.checkWin()) {
            gameOver(thePlayer);
            return;
        }

        if (!attack) {
            updateTurn();
            aiTurn();
        }
    };

    return { takeTurn };
};

export default gameLoop;
