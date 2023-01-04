import player from '../modules/player';

describe('Player', () => {
    it('Player should return an object with board and attack()', () => {
        expect(player('Name')).toStrictEqual({
            playerShips: expect.any(Array),
            board: expect.any(Object),
            name: expect.any(String),
            attack: expect.any(Function),
        });
    });

    it('Player can attack enemy player board', () => {
        const playerOne = player('name1', [
            [
                [2, 2],
                [2, 3],
            ],
            [
                [9, 2],
                [9, 3],
            ],
        ]);
        const playerTwo = player('name2', [
            [
                [2, 2],
                [2, 3],
            ],
            [
                [9, 2],
                [9, 3],
            ],
        ]);

        playerOne.attack(playerTwo.board, [2, 2]);
        playerOne.attack(playerTwo.board, [2, 3]);
        playerOne.attack(playerTwo.board, [9, 2]);
        playerOne.attack(playerTwo.board, [9, 3]);

        expect(playerTwo.board.checkWin()).toBe(true);
    });
});
