export const distinct = <T>(colecao: T[], atributo: keyof T): T[] => 
  [...new Map(colecao.map(item => [item[atributo], item])).values()];


export const fold = <T, U>(reducer: (acc: U, item: T) => U, init: U, array: T[]): U => 
array.length == 0 ? init : fold(reducer, reducer(init, array[0]), array.slice(1));


export const foldRight = <T, U>(reducer: (item: T, acc: U) => U, init: U, array: T[]): U => 
array.length == 0 ? init : reducer(array[array.length - 1], foldRight(reducer, init, array.slice(0, -1)));

export const groupBy = <T>(colecao: T[], atributo: keyof T): { [key: string]: T[] } =>
  colecao.reduce((acc, obj) => {
    const key = obj[atributo] as unknown as string;
    return {
      ...acc,
      [key]: [...(acc[key] || []), obj]
    };
  }, {} as { [key: string]: T[] });


export const orderBy = <T>(colecao: T[], atributo: keyof T): T[] => 
[...colecao].sort((a, b) => (b[atributo] > a[atributo] ? 1 : -1));


export const compose = (...fns: Function[]) => (arg: any) =>
foldRight((fn: Function, acc: any) => fn(acc), arg, fns);