import ship from '../modules/ship';

describe('ship', () => {
    it('ship function returns an object with length, cells, hit() and isSunk()', () => {
        expect(ship(3)).toMatchObject({
            length: 3,
            cells: [false, false, false],
            hit: expect.any(Function),
            isSunk: expect.any(Function),
        });
    });

    it('hit() modifies the cell of input number', () => {
        const newShip = ship(3);
        newShip.hit(1);
        expect(newShip.cells).toEqual([false, true, false]);
    });

    it('isSunk() returns false if not all cells are hit', () => {
        const newShip = ship(2);
        newShip.hit(0);
        expect(newShip.isSunk()).toBe(false);
    });

    it('isSunk() returns true if all cells are hit', () => {
        const newShip = ship(2);
        newShip.hit(0);
        newShip.hit(1);
        expect(newShip.isSunk()).toBe(true);
    });
});
