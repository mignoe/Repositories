import { Routes } from '@angular/router';
import { RepositoryForksComponent } from '../components/repository-forks/repository-forks.component';
import { TestPageComponent } from '../components/test-page/test-page.component';

export const routes: Routes = [
    { path: 'forks', component: RepositoryForksComponent },
    { path: 'tests', component: TestPageComponent }
];