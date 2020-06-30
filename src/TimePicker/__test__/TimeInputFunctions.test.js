import {cleanup} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {
    setTimeWithZero,
    checkLimit,
    validateInput,
    validateFirstNumber,
    getTime
} from "../TimePickerFunctions/functions";

describe("TimePickerInput functions", () => {
    it("setTimeWithZero function, should add zeros to X if neccesary", () =>{
        expect(setTimeWithZero(null)).toBe("00");
        expect(setTimeWithZero(undefined)).toBe("00");
        expect(setTimeWithZero(2)).toBe("02");
        expect(setTimeWithZero(11)).toBe("11");
    });

    it("checkLimit function, change the numbers according th limits", () => {
        const limit = 24;
        expect(() => checkLimit(null, null)).toThrowError(Error);
        expect(() => checkLimit(undefined, undefined)).toThrowError(Error);
        expect(checkLimit(24, limit)).toBe("0");
        expect(checkLimit(-1, limit)).toBe(limit - 1);
    })

    it("validateInput function, sould return false if input is invalid (by any cause)", () => {
        const limit = 24;
        expect(() => validateInput(null, null)).toThrowError(Error);
        expect(() => validateInput(undefined, undefined)).toThrowError(Error);
        expect(validateInput("a", limit)).toBe(false);
        expect(validateInput(500, limit)).toBe(false);
        expect(validateInput(2, limit)).toBe(true);
    })

    it("validateFirstNumber function, checks if the first number is invalid", () => { //in case of limit=24, num = 45, 2 < 4, and i'll know that i need to have 04 in my input (validate that my input won't be higher then the limit);
        const limit = 24;
        expect(() => validateFirstNumber(null, null)).toThrowError(Error);
        expect(() => validateFirstNumber(undefined, undefined)).toThrowError(Error);
        expect(validateFirstNumber(500, limit)).toBe(true); // true, it is invalid.
        expect(validateFirstNumber(2, limit)).toBe(false);
    })

    it("getTim function, (validateInput && setTimeWityZero)", () => {
        const limit = 60;
        expect(getTim("a",limit)).toBe(false);
        expect(getTim(3,limit)).toBe("03");
        expect(getTim(30,limit)).toBe("30");
    })
    
    afterEach(cleanup);     
});
