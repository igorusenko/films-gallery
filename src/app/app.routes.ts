import { Routes } from '@angular/router';
import {authGuard} from './core/guards/auth.guard';
import {MovieListComponent} from './components/movie-list/movie-list.component';
import {HomeComponent} from './pages/home/home.component';
import {MovieDetailComponent} from './components/movie-detail/movie-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  },
  {
    path: 'movie/:id',
    component: MovieDetailComponent,
    canActivate: [authGuard]
  }
];
