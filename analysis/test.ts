const distinct2 = <T>(colecao: T[], atributo: keyof T): T[] => 
    [...new Map(colecao.map(item => [item[atributo], item])).values()];

// "[..." == "iterator spread"

class Test{
    id: number;

    constructor(id: number){
        this.id = id;
    }
}

const tests = [new Test(1), new Test(2), new Test(3), new Test(1), new Test(2), new Test(3)];

let atributo: keyof Test = 'id';

console.log([new Map(tests.map(item => [item[atributo], item])).values()]);

console.log(distinct2(tests, 'id'));

let idOneTests : Test[]= []
console.log(tests.reduce((acc, obj) => acc.concat(obj.id == 1 ? obj : []), idOneTests));

let x = [1,2,3,4,5,6,7,8,9,10];

console.log(...[1,2,3,4], [1,2,3])