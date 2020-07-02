const checkIfNullOrUndefined = (a, b) => {
    return a === undefined || a === null || b === undefined || b === null;
};

export const setTimeWithZero = (Value) => {
    if (!Value) {
        return "00";
    };
    const x = Value.target ? Value.target.value.toString() : Value.toString();
    if (x.length ===0) {
        return "00";
    } else if (x.length === 1) {
        return `0${x}`;
    }
    return x;
};

export const checkLimit = (number, limit) => {
    if (checkIfNullOrUndefined(number, limit)){
        throw Error("number/limit is null/undefined");
    };
    // eslint-disable-next-line
    if(number >= limit) {
        return "00";
    };
    if (number < 0) {
        return limit - 1;
    };
    return false;
};

export const validateInput = (number, limit) => {
    if (checkIfNullOrUndefined(number, limit)){
        throw Error("number/limit is null/undefined");
    };

    return (
        !isNaN(number) &&
        number >= 0 &&
        number < limit && 
        number.toString().length <= 2
    );

};
export const validateFirstNumber = (number, limit) => {
    if (checkIfNullOrUndefined(number, limit)){
        throw Error("number/limit is null/undefined");
    };

    // eslint-disable-next-line
    return number > limit.toString()[0] || number == limit /10
};

export const getTime = (number, limit) => {
    if(validateInput(number, limit)) {
        return setTimeWithZero(number);
    }
    return false;
};
