type GroupedByProperty<T> = {
  [K in keyof T]: T[K][];
};

export const arrayToObjects = <T>(headers: string[], data: T[][]) => {
    return data.map(row => Object.fromEntries(headers.map((key, index) => [key, row[index]])));
};

export const groupByProperties = <T extends Record<string, any>>(arr: T[]): GroupedByProperty<T> => {
    const result: Record<string, any> = {};

    if (arr.length === 0) {
        return result as GroupedByProperty<T>;
    }

    const keys = Object.keys(arr[0]) as (keyof T)[];

    keys.forEach((key) => {
        result[key as string] = arr.map((item) => item[key]);
    });

    return result as GroupedByProperty<T>;
};