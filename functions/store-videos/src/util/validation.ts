const isString = (x: any): x is string => typeof x === 'string';

const isStringArray = (x: any): x is string[] => {
    if (!Array.isArray(x)) {
        return false;
    }

    return !(x.some((item) => !isString(item)));
};

export { isString, isStringArray };
