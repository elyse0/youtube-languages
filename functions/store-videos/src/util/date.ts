const getYesterdayISODateString = (): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    return `${yesterday.toISOString().slice(0, 10)}T00:00:00+00:00`;
};

export { getYesterdayISODateString };
