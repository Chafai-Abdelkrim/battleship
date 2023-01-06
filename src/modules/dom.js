import gameLoop from './gameloop';
import player from './player';
import randomShips from './randomShips';

const buildBoards = () => {
    const [boardOneContainer, boardTwoContainer] =
        document.querySelectorAll('.board-container');
    const boardOne = document.createElement('div');
    const boardTwo = document.createElement('div');

    boardOne.classList.add('board-one');
    boardTwo.classList.add('board-two');

    for (let i = 10; i > 0; i--) {
        for (let j = 0; j < 10; j++) {
            const div1 = document.createElement('div');
            const div2 = document.createElement('div');

            div1.classList.add('board-cell');
            div1.setAttribute('data-coords', `${i},${j}`);

            div2.classList.add('board-cell');
            div2.setAttribute('data-coords', `${i},${j}`);

            boardOne.append(div1);
            boardTwo.append(div2);
        }
    }

    if (boardOneContainer.childElementCount > 1)
        boardOneContainer.removeChild(boardOneContainer.lastChild);

    if (boardTwoContainer.childElementCount > 1)
        boardTwoContainer.removeChild(boardTwoContainer.lastChild);

    boardOneContainer.append(boardOne);
    boardTwoContainer.append(boardTwo);
};

const boardController = (gameloop) => {
    const boardTwo = document.querySelector('.board-two');

    boardTwo.addEventListener('click', (e) => {
        if (!e.target.dataset.coords) return;
        const coords = e.target.dataset.coords.split(',').map(Number);
        gameLoop.takeTurn(coords);
    });
};

const updateBoard = (coords, attack, player, enemy) => {
    const boardOne = document.querySelector('.board-one');
    const boardTwo = document.querySelector('.board-two');

    const board = player.name ? boardTwo : boardOne;

    for (let i = 0; i < board.childNodes.length; i++) {
        const node = board.childNodes[i];

        if (node.dataset.coords === coords.toString()) {
            node.classList.add(attack ? 'hit' : 'miss');
            break;
        }
    }

    const sunkShips = enemy.board.checkSunk();

    if (sunkShips) {
        sunkShips.forEach((ship) => {
            ship.coords.forEach((coord) => {
                for (let i = 0; i < board.childNodes.length; i++) {
                    const node = board.childNodes[i];

                    if (node.dataset.coords === coord.toString()) {
                        node.classList.add('sunk');
                        break;
                    }
                }
            });
        });
    }
};
