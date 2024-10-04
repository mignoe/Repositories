

const fold = <T, U>(reducer: (acc: U, item: T) => U, init: U, array: T[]): U => 
    array.length == 0 ? init : fold(reducer, reducer(init, array[0]), array.slice(1))

const compose = (...fns: Function[]) => (arg: any) =>
    fold((acc, fn) => fn(acc), arg, fns);
      
const f1 = (x: number) => x + 1;
const f2 = (x: number) => x * 2;
const f3 = (x: number) => x - 3;

const result1 = compose(f1, f2, f3)(0); 

console.log(result1);
// // console.log(result2);

// const append = (a: number[], b: number[]) => a.concat(b);

// console.log(append([1, 2, 3], [4, 5, 6]));
// console.log(fold(append, [], [[1, 2, 3], [4, 5, 6]]));