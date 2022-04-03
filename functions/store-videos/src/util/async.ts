function asyncMap<T, U>(array: T[], callbackfn: (value: T, index: number, array: T[]) => Promise<U>): Promise<U[]> {
    return Promise.all(array.map(callbackfn));
}

async function asyncFilter<T>(array: T[], callbackfn: (value: T, index: number, array: T[]) => Promise<boolean>): Promise<T[]> {
    const filterMap = await asyncMap(array, callbackfn);
    return array.filter((value, index) => filterMap[index]);
}

export { asyncMap, asyncFilter };
