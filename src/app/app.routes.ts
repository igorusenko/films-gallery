import { Routes } from '@angular/router';
import {authGuard} from './core/guards/auth.guard';
import {MovieListComponent} from './components/movie-list/movie-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MovieListComponent,
    canActivate: [authGuard]
  }
];
