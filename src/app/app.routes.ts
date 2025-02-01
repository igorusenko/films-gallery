import { Routes } from '@angular/router';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/movie-list/movie-list.component').then(m => m.MovieListComponent),
    canActivate: [authGuard]
  }
];
