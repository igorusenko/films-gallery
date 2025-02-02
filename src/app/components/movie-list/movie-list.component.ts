import {Component, computed, effect, inject} from '@angular/core';
import {MovieService} from '../../core/services/movie.service';
import {MovieComponent} from '../movie/movie.component';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {CarouselModule, CarouselResponsiveOptions} from 'primeng/carousel';
import {Tag} from 'primeng/tag';
import {Button} from 'primeng/button';
import {IMovie, IMoviesResponse, IMoviesSearchFilter} from '../../core/interface/movie/movie.interface';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs';
import {environment} from '../../environment/environment';
@Component({
  selector: 'app-movie-list',
  imports: [
    MovieComponent,
    CarouselModule,
    Button,
    FloatLabel,
    InputText,
    FormsModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  public  popularPage: number = 1;
  public searchTextControl = new FormControl();
  private movieService = inject(MovieService);
  public popularMovies: IMoviesResponse | null;
  popularMoviesSignal = computed(() => this.movieService.popularMovies());
  filterMoviesSignal = computed(() => this.movieService.filteredMovies());

  get getFilteredMovies(): Array<IMovie> {
    return this.filterMoviesSignal()?.results as Array<IMovie>;
  }

  constructor() {
    this.fetchPopularMovies(this.popularPage)
    this.onSearchTextChanged();

    effect(() => {
      if(this.popularMoviesSignal()) {
        this.popularMoviesEffect();
      }
    });
  }

  fetchPopularMovies(page: number) {
    this.movieService.getPopularMovies(page);
  }

  private onSearchTextChanged(): void {
    this.searchTextControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        this.movieService.getMoviesByFilter(this.createFilterModel(value))
      });
  }

  private popularMoviesEffect(): void {
    this.popularMovies =
      {
        page: this.popularMoviesSignal()?.page,
        total_pages: this.popularMoviesSignal()?.total_pages,
        results: this.popularMovies ? [...this.popularMovies?.results!, ...this.popularMoviesSignal()?.results!] : this.popularMoviesSignal()?.results,
        total_results: this.popularMoviesSignal()?.total_results,
      }
    if (this.popularMovies.page! > 1) {
      const firstShowElseIndex = this.popularMovies.results!.findIndex(movie => movie.showElse);
      if (firstShowElseIndex !== -1) {
        this.popularMovies.results!.splice(firstShowElseIndex, 1);
      }
    }
  }

  private createFilterModel(query: string): IMoviesSearchFilter {
    return {
      query
    }
  }

  public loadMorePopularMovies(): void {
    this.fetchPopularMovies(this.popularPage += 1)
  }

  public loadMoreSearchMovies(): void {

  }

  protected readonly environment = environment;
}
