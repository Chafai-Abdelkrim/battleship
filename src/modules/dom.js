import gameLoop from './gameloop';
import randomShips from './randomShips';

//function to build the game board
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
//function that lets theplayer make his move by clicking on one of the cells
const boardController = (gameloop) => {
    const boardTwo = document.querySelector('.board-two');

    boardTwo.addEventListener('click', (e) => {
        if (!e.target.dataset.coords) return;
        const coords = e.target.dataset.coords.split(',').map(Number);
        gameLoop.takeTurn(coords);
    });
};
//function that updates the board cells after an action has been made
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
//function to show the players ships on the board
const showPlayerShips = (playerShips) => {
    const boardOne = document.querySelector('.board-one');

    playerShips.forEach((ship) => {
        ship.forEach((coords) => {
            for (let i = 0; i < boardOne.childNodes.length; i++) {
                const node = boardOne.childNodes[i];

                if (node.dataset.coords === coords.toString()) {
                    node.classList.add('friendly');
                    break;
                }
            }
        });
    });
};
//function to totate a ship horizontaly or verticaly
const rotateShip = (ship) => {
    const rotatedShip = [];
    let outOfBounds = false;

    if (ship.length < 2) return ship;

    if (ship[0][0] === ship[1][0]) {
        ship.forEach((coord, index) => {
            const x = coord[0] - index;
            const y = coord[1] - index;
            if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;
            rotatedShip.push([x, y]);
        });
    }

    if (ship[0][1] === ship[1][1]) {
        ship.forEach((coord, index) => {
            const x = coord[0] + index;
            const y = coord[1] + index;
            if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;
            rotatedShip.push([x, y]);
        });
    }

    if (outOfBounds) return ship;

    return rotatedShip;
};
//function to move a ship on the board
const moveShip = (ship, newCoords) => {
    const movedShip = [];
    let outOfBounds = false;

    if (ship.length < 2) return [newCoords];

    if (ship[0][0] === ship[1][0]) {
        ship.forEach((coord, index) => {
            const x = newCoords[0];
            const y = newCoords[1] + index;
            if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;
            movedShip.push([x, y]);
        });
    }

    if (ship[0][1] === ship[1][1]) {
        ship.forEach((coord, index) => {
            const x = newCoords[0] - index;
            const y = newCoords[1];
            if (x < 0 || x > 9 || y < 0 || y > 9) outOfBounds = true;
            movedShip.push([x, y]);
        });
    }

    if (outOfBounds) return ship;

    return movedShip;
};
//function to build the modal board
const buildModalBoard = (board, ships) => {
    for (let i = 10; i > 0; i--) {
        for (let j = 0; j < 10; j++) {
            const div = document.createElement('div');

            div.setAttribute('data-coords', `${i},${j}`);
            div.classList.add('modal-board-cell');

            board.append(div);
        }
    }

    ships.forEach((ship, index) => {
        const coords = ship[0];

        let isVertical = false;
        if (ship.length > 1) isVertical = ship[0][0] !== ship[1][0];

        const rotation = isVertical ? 'vertical' : 'horizontal';

        for (let i = 0; i < board.childNodes.length; i++) {
            const node = board.childNodes[i];

            if (node.dataset.coords === coords.toString()) {
                const div = document.createElement('div');
                div.classList.add('modal-board-ship');
                div.classList.add(`${rotation}-${ship.length}`);
                div.setAttribute('data-index', index);
                div.setAttribute('draggable', 'true');

                node.append(div);
                break;
            }
        }
    });
};
//function to place the ships where you want on the board
const arrangeShips = (ships) => {
    const boardShips = document.querySelectorAll('.modal-board.ship');

    boardShips.forEach((boardShip) => {
        //rotates the ship on the board when clicked
        boardShip.addEventListener('click', (e) => {
            const ship = ships[boardShip.dataset.index];
            const rotatedShip = rotateShip(ship);
            const newShips = [...ships];

            if (ship.toString() === rotatedShip.toString()) return;

            newShips.splice(boardShip.dataset.index, 1);

            const unique = rotatedShip.every((rotatedCoords) => {
                return newShips.every((newShip) => {
                    return newShip.every((newCoords) => {
                        return (
                            newCoords.toString() !== rotatedCoords.toString()
                        );
                    });
                });
            });

            if (unique) {
                ships.splice(e.target.dataset.index, 1, rotatedShip);
                e.target.classList.toggle(`vertical-${rotatedShip.length}`);
                e.target.classList.toggle(`horizontal-${rotatedShip.length}`);
            }
        });
        //drages the ship on the board
        const boardCells = document.querySelectorAll('.modal-board-cell');

        boardCells.forEach((cell) => {
            cell.addEventListener('dragover', (e) => {
                e.preventDefault();
                const draggable = document.querySelector('.dragging');
                const ship = ships[draggable.dataset.index];
                const movedShip = moveShip(
                    ship,
                    cell.dataset.coords.split(',').map(Number)
                );
                const newShips = [...ships];

                if (
                    ship.toString() === movedShip.toString() &&
                    movedShip.length > 2
                )
                    return;

                newShips.splice(draggable.dataset.index, 1);

                const unique = movedShip.every((movedCoords) => {
                    return newShips.every((newShip) => {
                        return newShip.every((newCoords) => {
                            return (
                                newCoords.toString() !== movedCoords.toString()
                            );
                        });
                    });
                });

                if (unique) {
                    ships.splice(draggable.dataset.index, 1, movedShip);
                    cell.append(draggable);
                }
            });
        });

        boardShip.addEventListener('dragstart', () => {
            boardShip.classList.add('dragging');
        });

        boardShip.addEventListener('dragend', () => {
            boardShip.classList.remove('dragging');
        });
    });
};
//function that starts the game
const startGameModal = () => {
    const board = document.querySelector('.modal-board');
    const form = document.querySelector('modal-form');
    const randomBtn = document.querySelector('.modal-random');

    let ships = randomShips();

    buildModalBoard(board, ships);
    arrangeShips(ships);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.querySelector('.modal-name-input');
        const name = document.querySelector('.board-one-title');
        const modal = document.querySelector('.modal');
        const newGame = gameLoop(nameInput, ships);

        modal.classList.add('display-none');
        name.innerText = nameInput.value;

        boardController(newGame);
    });

    randomBtn.addEventListener('click', () => {
        ships = randomShips();
        board.textContent = '';
        buildModalBoard(board, ships);
        arrangeShips(ships);
    });
};
