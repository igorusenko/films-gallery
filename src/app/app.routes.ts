import { Routes } from '@angular/router';
import {authGuard} from './core/guards/auth.guard';
import {MovieListComponent} from './components/movie-list/movie-list.component';
import {HomeComponent} from './pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]
  }
];
