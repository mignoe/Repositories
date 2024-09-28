import { Component } from '@angular/core';
// import * as fs  from 'fs';
import { distinct,groupBy,orderBy,fold,compose  } from '../../utils';

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [],
  templateUrl: './test-page.component.html',
  styleUrl: './test-page.component.css'
})
export class TestPageComponent {
  constructor() {

    const tests = [
      new Test(1),
      new Test(2),
      new Test(3),
      new Test(1),
      new Test(2),
      new Test(3),
    ];

    console.log(tests);

    console.log(distinct(tests, 'id'));
    console.log(groupBy(tests, 'id'));
    console.log(orderBy(tests, 'id'));
    // console.log(fold((acc, test) => acc + test.id, 0, tests));
    // console.log(compose((x) => x + 1, (x) => x + 1)(1));
  }

}

class Test {
  id: number;

  constructor(id: number) {
    this.id = id; 
  }
}
