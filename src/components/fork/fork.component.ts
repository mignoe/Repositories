import { Component } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-fork',
  standalone: true,
  imports: [NgFor],
  templateUrl: './fork.component.html',
  styleUrl: './fork.component.css'
})
export class ForkComponent {
  
  fork = {};

  constructor(fork : any) {
    console.log("ForkComponent created");
    console.log(fork);

    this.fork = fork;
  }
}
