import {Component, computed, effect, inject} from '@angular/core';
import {MovieService} from '../../core/services/movie.service';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  private movieService = inject(MovieService);
  movies = computed(() => this.movieService.movies());

  constructor() {
    this.movieService.fetchMovies();
    effect(() => {
      console.log(this.movies())
    });
  }
}
