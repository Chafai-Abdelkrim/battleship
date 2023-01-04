import gameBoard from './gameboard';
import randomShips from './randomShips';

const player = (name = 'your name', shipArray) => {
    const playerShips = shipArray || randomShips();
    
    const board = gameBoard(playerShips);
    
    const attack = (enemyBoard, attackCoords) => {
        return enemyBoard.receiveAttack(attackCoords);
    };

    return { playerShips, board, name, attack };
};

export default player;
