
const fold = <T, U>(reducer: (acc: U, item: T) => U, init: U, array: T[]): U => 
    array.length != 0 ? fold(reducer, reducer(init, array[0]), array.slice(1)) : init;

let inteiros = [1, 2, 3, 4, 5];

let soma = fold((acc, item) => acc + item, 0, inteiros);

let inversa = fold<number, number[]>((acc: number[], item: number) => [item, ...acc], [], inteiros);

console.log(inversa);


console.log(soma);

console.log([].slice(1));