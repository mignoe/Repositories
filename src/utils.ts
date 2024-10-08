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


export const fold = <T, U>(reducer: (acc: U, item: T) => U, init: U, array: T[]): U => 
  array.length == 0 ? init : fold(reducer, reducer(init, array[0]), array.slice(1))


export const compose = (...fns: Function[]) => (arg: any) =>
  fold((acc, fn) => fn(acc), arg, fns);

  