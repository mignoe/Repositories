export const distinct = <T>(colecao: T[], atributo: keyof T): T[] => 
    [...new Map(colecao.map(item => [item[atributo], item])).values()];


export const groupBy = <T>(colecao: T[], atributo: keyof T): { [key: string]: T[] } =>
    colecao.reduce((acc, obj) => {
      const key = obj[atributo] as unknown as string;
      return {
        ...acc,
        [key]: [...(acc[key] || []), obj] // Create a new array for immutability
      };
    }, {} as { [key: string]: T[] });
  

export const orderBy = <T>(colecao: T[], atributo: keyof T): T[] => 
[...colecao].sort((a, b) => (a[atributo] > b[atributo] ? 1 : -1));

const fold = <T, U>(reducer: (acc: U, item: T) => U, init: U, array: T[]): U => 
  array.length != 0 ? fold(reducer, reducer(init, array[0]), array.slice(1)) : init;

export const compose = <T>(f1: (arg: T) => T, f2: (arg: T) => T) => (arg: T): T => 
f1(f2(arg));

  