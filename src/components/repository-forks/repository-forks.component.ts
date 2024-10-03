import { Component } from '@angular/core';
import { distinct, orderBy } from '../../utils';
import { Fork } from '../../classes';
import { NgFor, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-repository-forks',
  templateUrl: './repository-forks.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    FormsModule,
    MatProgressSpinnerModule,
    NgFor,
    CommonModule
  ],
  styleUrl: './repository-forks.component.css'
})
export class RepositoryForksComponent {
  repository = '';
  forks: Fork[] = [];
  page = 0; // Zero-based index para o paginador
  perPage = 9; // Número de forks por página
  totalItems = 0; // Número total de forks
  isLoading = false; // Controla o estado de loading

  constructor() { }

  search() {
    this.page = 0; // Reinicia para a primeira página em uma nova pesquisa
    this.fetchForks();
  }

  fetchForks() {
    this.isLoading = true; // Mostra o spinner de loading
    const url = `https://api.github.com/repos/${this.repository}/forks?default_branch_only=false`;

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data)
        this.forks = distinct(data, "id");
        if (this.fetchForks.length % 3 == 0) {
          this.totalItems = this.forks.length + 10;
        }
        this.isLoading = false;
      })
      .catch(error => {
        console.error("Erro ao buscar os forks:", error);
        this.isLoading = false; // Oculta o spinner mesmo em caso de erro
      });
  }

  orderForksBy(field: keyof Fork) {
    this.forks = orderBy(this.forks, field); // Ordena os forks
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.perPage = event.pageSize;
    this.fetchForks(); // Carrega os forks da nova página
  }
}