import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { distinct, orderBy } from '../../utils';
import { Fork, Owner } from '../../classes';

import { NgFor, CommonModule } from '@angular/common';

@Component({
  selector: 'app-repository-forks',
  standalone: true,
  imports: [FormsModule, NgFor, CommonModule],
  templateUrl: './repository-forks.component.html',
  styleUrl: './repository-forks.component.css'
})
export class RepositoryForksComponent {
  repository = "";
  forks: Fork[] = [];

  constructor() {
    // this.repository = "angular/angular";
    console.log(this.repository);
  }

  search() {
    console.log(this.repository);
    const url = "https://api.github.com/repos/" + this.repository + "/forks" // your API URL


    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log("Fetched data:", data);
        this.forks = distinct(data, "id");
      })
      .catch(error => {
        console.error("Error fetching the URL:", error);
      });
  }

  orderForksBy(field : keyof Fork) {
    this.forks = orderBy(this.forks, field);
  }

}
