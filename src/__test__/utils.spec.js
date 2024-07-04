import { find_duplicate_in_array } from "./../utils/index";

describe("findDuplicatesOne function", () => {
    test("it should find a dupplicate number", () => {
        const input = [1, 2, 5, 1, 8];
        const output = find_duplicate_in_array(input);

        expect(output).toBe([1]);
    });
});
