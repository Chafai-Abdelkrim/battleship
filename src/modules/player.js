import gameBoard from './gameboard';

const player = (name, shipArray) => {
    const playerShips = shipArray;

    const board = gameBoard(playerShips);
    
    const attack = (enemyBoard, attackCoords) => {
        return enemyBoard.receiveAttack(attackCoords);
    };

    return { playerShips, board, name, attack };
};

export default player;
