import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { distinct, orderBy } from '../../utils';
import { Fork } from '../../classes';
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
  page = 1;
  perPage = 30; // Number of forks per page

  constructor() {}

  search() {
    this.page = 1; // Reset to first page on new search
    this.fetchForks();
  }

  fetchForks() {
    const url = `https://api.github.com/repos/${this.repository}/forks?page=${this.page}&per_page=${this.perPage}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.forks = distinct(data, "id");
      })
      .catch(error => {
        console.error("Error fetching the forks:", error);
      });
  }

  orderForksBy(field: keyof Fork) {
    this.forks = orderBy(this.forks, field);
  }

  nextPage() {
    this.page += 1;
    this.fetchForks();
  }

  previousPage() {
    if (this.page > 1) {
      this.page -= 1;
      this.fetchForks();
    }
  }
}
