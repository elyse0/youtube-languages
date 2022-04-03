const getGetRequest = (url: string, queryParameters?: Record<string, string>): string => {
    let request = url;

    if (!queryParameters) {
        return request;
    }

    const objectKeys = Object.keys(queryParameters);
    for (let i = 0; i < objectKeys.length; i += 1) {
        const key = objectKeys[i];
        const value = queryParameters[key];

        if (!value) {
            // eslint-disable-next-line no-continue
            continue;
        }

        const encodedValue = encodeURIComponent(value);

        if (i === 0) {
            request += `?${key}=${encodedValue}`;
        } else {
            request += `&${key}=${encodedValue}`;
        }
    }

    return request;
};

export { getGetRequest };
