 const distinct = <T>(colecao: T[], atributo: keyof T): T[] => 
    [...new Map(colecao.map(item => [item[atributo], item])).values()];


 const fold = <T, U>(reducer: (acc: U, item: T) => U, init: U, array: T[]): U => 
  array.length == 0 ? init : fold(reducer, reducer(init, array[0]), array.slice(1));


 const foldRight = <T, U>(reducer: (item: T, acc: U) => U, init: U, array: T[]): U => 
  array.length == 0 ? init : reducer(array[array.length - 1], foldRight(reducer, init, array.slice(0, -1)));

 const groupBy = <T>(colecao: T[], atributo: keyof T): { [key: string]: T[] } =>
    colecao.reduce((acc, obj) => {
      const key = obj[atributo] as unknown as string;
      return {
        ...acc,
        [key]: [...(acc[key] || []), obj]
      };
    }, {} as { [key: string]: T[] });
  

 const orderBy = <T>(colecao: T[], atributo: keyof T): T[] => 
[...colecao].sort((a, b) => (b[atributo] > a[atributo] ? 1 : -1));


 const compose = (...fns: Function[]) => (arg: any) =>
  foldRight((fn: Function, acc: any) => fn(acc), arg, fns);





const f1 = (a: number) => a + 1;
const f2 = (a: number) => a * 2;
const f3 = (a: number) => a - 3;
const f4 = (a: number) => a / 4;

const composed = compose(f1, f2, f3, f4);

 console.log(composed(4)); // (1 - 3) * 2 + 1 = -3



