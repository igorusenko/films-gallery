import {Component, computed, effect, inject} from '@angular/core';
import {MovieService} from '../../core/services/movie.service';
import {MovieComponent} from '../movie/movie.component';

@Component({
  selector: 'app-movie-list',
  imports: [
    MovieComponent
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  private movieService = inject(MovieService);
  popularMovies = computed(() => this.movieService.popularMovies());
  // movieById = computed(() => this.movieService.movieById());

  constructor() {
    this.movieService.getPopularMovies();
    // this.movieService.getMovieById(939243);
    effect(() => {
      console.log(this.popularMovies())
      // console.log(this.movieById())
    });
  }
}
