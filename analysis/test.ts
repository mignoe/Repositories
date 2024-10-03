const compose = (...fns: Function[]) => (arg: any) =>
    fns.reduceRight((acc, fn) => fn(acc), arg);

const f1 = (arg: number) => arg * 2;

const f2 = (arg: number) => arg + 1;
const f3 = (arg: number) => arg + 3;

const f4 = compose(f1, f2, f3);

console.log([].slice(1));
console.log(f4(1));