export const arrayToObjects = <T>(headers: string[], data: T[][]) => {
    return data.map(row => Object.fromEntries(headers.map((key, index) => [key, row[index]])));
};
