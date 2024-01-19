import {ripFromArray, putToArray} from "../src/utils/ArrayHelper";

describe('testing ArrayHelper', () => {
    test('testing rip from array', () => {
        const array = [0, 1, 2];
        expect(ripFromArray(array, 1)).toBe(1);
        expect(array.length).toBe(2);
    })
    test('testing put to array', () => {
        const array = [0, 1, 2];
        expect(array.length).toBe(3);
        putToArray(array, 3);
        expect(array.length).toBe(4);
        expect(array[0]).toBe(3)
    })
})