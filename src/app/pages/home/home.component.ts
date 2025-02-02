import { Component } from '@angular/core';
import {MovieListComponent} from '../../components/movie-list/movie-list.component';
import {HeaderComponent} from '../../layouts/header/header.component';

@Component({
  selector: 'app-home',
  imports: [
    MovieListComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
