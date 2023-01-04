import gameBoard from '../modules/gameboard';

describe('Gameboard', () => {
    it('gameboard returns an object with receiveAttack()', () => {
        expect(
            gameBoard([
                [
                    [5, 2],
                    [5, 3],
                ],
            ])
        ).toMatchObject({
            availableAttacks: expect.any(Array),
            receiveAttack: expect.any(Function),
            checkWin: expect.any(Function),
            checkRemaining: expect.any(Function),
            checkSunk: expect.any(Function),
        });
    });

    it('receiveAttack() returns true if there is a hit', () => {
        const board = gameBoard([
            [
                [5, 2],
                [5, 3],
            ],
        ]);

        expect(board.receiveAttack([5, 2])).toBe(true);
    });

    it('receiveAttack() returns false if there is no hit', () => {
        const board = gameBoard([
            [
                [5, 2],
                [5, 3],
            ],
        ]);

        expect(board.receiveAttack([5, 5])).toBe(false);
    });

    it('CheckWin() returns true if all ships are sunk', () => {
        const board = gameBoard([
            [
                [5, 2],
                [5, 3],
            ],
            [
                [7, 2],
                [7, 3],
            ],
        ]);

        board.receiveAttack([5, 2]);
        board.receiveAttack([5, 3]);
        board.receiveAttack([7, 2]);
        board.receiveAttack([7, 3]);

        expect(board.checkWin()).toBe(true);
    });

    it('CheckWin() return false if not all ships are sunk', () => {
        const board = gameBoard([
            [
                [5, 2],
                [5, 3],
            ],
        ]);

        expect(board.checkWin()).toBe(false);
    });

    it('CheckRemaining() returns the remaining number of ships', () => {
        const board = gameBoard([
            [
                [5, 2],
                [5, 3],
            ],
            [
                [7, 2],
                [7, 3],
            ],
        ]);

        board.receiveAttack([7, 2]);
        board.receiveAttack([7, 3]);

        expect(board.checkRemaining()).toBe(1);
    });

    it('checkSunk() returns the sunk ships', () => {
        const board = gameBoard([
            [
                [5, 2],
                [5, 3],
            ],
            [
                [7, 2],
                [7, 3],
            ],
        ]);

        board.receiveAttack([7, 2]);
        board.receiveAttack([7, 3]);

        expect(board.checkSunk()).toEqual(expect.any(Array));
    });
});
