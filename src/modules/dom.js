import gameLoop from './gameloop';
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
