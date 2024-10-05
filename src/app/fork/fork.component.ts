import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';

import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Fork } from '../models/fork.model';
import { GithubService } from '../service/github.service';
import { map, tap, catchError, of } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';

import { distinct, orderBy, fold, groupBy, compose } from '../utils/utils';

@Component({
  selector: 'app-fork',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatPaginatorModule,
    FormsModule,
    MatProgressSpinnerModule,
    NgFor,
    CommonModule,
  ],
  templateUrl: './fork.component.html',
  styleUrls: ['./fork.component.scss'],
})
export class ForkComponent {
  
  repository = '';
  token = '';
  forks: Fork[] = [];
  filteredForks: Fork[] = [];

  licenseGroupedAndSortedForks: any[] = []; // This variable should be used to store the grouped and sorted forks


  isSumDone = false;  // Controls when the element that displays the sum of stars should be shown
  totalStars: number = 0; 

  page = 0;
  perPage = 100;
  totalItems = 0;
  isLoading = false;
  searchQuery = '';
  selectedOrder = '';

  showForks = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private githubService: GithubService) {}

  search() {
    this.page = 0;
    this.fetchForks();
    this.getCountForks();
    this.totalStars = 0;
    this.isSumDone = false;
    this.licenseGroupedAndSortedForks = [];
    this.showForks = true;
  }

  fetchForks() {
    this.startLoading();
    console.log(this.page, this.perPage);
    this.githubService
      .getRepositoriesForks(this.repository, this.page, this.perPage, this.token)
      .pipe(
        map((response) => distinct(response, 'id')),
        tap((forks) => {
          this.forks = forks;
          this.filteredForks = forks;
        }),
        catchError((error) => {
          console.error('Erro ao buscar os forks:', error);
          this.stopLoading();
          return of([]);
        }),
        tap(() => this.stopLoading())
      )
      .subscribe();
  }

  getCountForks() {
    this.githubService
      .getRepository(this.repository)
      .pipe(
        map((response) => {
          this.totalItems = response?.forks;
        }),
        catchError((error) => {
          console.error('Erro ao buscar total de forks:', error);
          return of({});
        })
      )
      .subscribe();
  }

  startLoading() {
    this.isLoading = true;
  }

  stopLoading() {
    this.isLoading = false;
  }


  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.perPage = event.pageSize;
    this.searchQuery = '';
    this.fetchForks()
  }

  sortBy(field: string){
    const teste = field as keyof Fork
    console.log(teste)
    this.filteredForks = orderBy(this.filteredForks,teste)
  }
    

  applyFilter() {
    if (this.searchQuery) {
      const lowerCaseQuery = this.searchQuery.toLowerCase();
      this.filteredForks = this.forks.filter(fork =>
        fork.full_name.toLowerCase().includes(lowerCaseQuery) ||
        fork.owner.login.toLowerCase().includes(lowerCaseQuery) ||
        (fork.description && fork.description.toLowerCase().includes(lowerCaseQuery)) ||
        (fork.license?.name && fork.license.name.toLowerCase().includes(lowerCaseQuery))
      );
    }else {
      this.filteredForks = [...this.forks]; 
    }
    this.totalItems = this.filteredForks.length;
  }

  onSearchChange() {
    this.page = 0;
    this.applyFilter();
  }

  sumStars(): void {
    this.totalStars = fold((acc, fork) => acc + fork.stargazers_count, 0, this.filteredForks);
    this.isSumDone = true;
  }

  invertForks(): void {
    this.filteredForks = fold<Fork, Fork[]>((acc, fork) => [fork, ...acc], [], this.filteredForks);
  }

  groupForkByLicensesAndSortByStars(): void {
    const groupedAndSorted = compose(
      (forks: Fork[]) =>
        forks.map(fork => ({
          ...fork,
          licenseName: fork.license?.name || 'No License' // Add licenseName property
        })),
      (forks: Fork[]) => Object.entries(groupBy(forks, 'licenseName')),
      (groupedForks: [string, Fork[]][]) =>
        groupedForks.map(([key, forks]) => ({
          license: key,
          forks: orderBy(forks, 'stargazers_count'),
        }))
      
    );
  
    this.licenseGroupedAndSortedForks =  groupedAndSorted(this.filteredForks);
    this.showForks = false;
    console.log(this.licenseGroupedAndSortedForks)
    console.log(((forks: Fork[]) => Object.entries(groupBy(this.filteredForks, 'licenseName')))(this.filteredForks))
  }
  
}
