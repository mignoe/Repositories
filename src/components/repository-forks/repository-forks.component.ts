import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-repository-forks',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './repository-forks.component.html',
  styleUrl: './repository-forks.component.css'
})
export class RepositoryForksComponent {
  repository = "";

  constructor() {
    // this.repository = "angular/angular";
    console.log(this.repository);
  }

  search() {
    console.log(this.repository);
  }

}
