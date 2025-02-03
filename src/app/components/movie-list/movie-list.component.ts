import {Component, computed, effect, inject} from '@angular/core';
import {MovieService} from '../../core/services/movie.service';
import {MovieComponent} from '../movie/movie.component';
import {NgIf} from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import {Button} from 'primeng/button';
import {IMovie, IMoviesResponse, IMoviesSearchFilter} from '../../core/interface/movie/movie.interface';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs';
import {environment} from '../../../environment/environment';
import {animate, style, transition, trigger} from '@angular/animations';
import {fadeInAnimation} from '../../core/animations/fadeIn';
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
  styleUrl: './movie-list.component.scss',
  animations: [fadeInAnimation]
})
export class MovieListComponent {
  public popularMoviesPage: number = 1;
  public filterMoviesPage: number = 1;
  public searchTextControl = new FormControl();
  public popularMovies: IMoviesResponse | null;
  public filterMovies: IMoviesResponse | null;
  private isSearchTextChanged: boolean = false;
  private movieService = inject(MovieService);
  popularMoviesSignal = computed(() => this.movieService.popularMovies());
  filterMoviesSignal = computed(() => this.movieService.filteredMovies());

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 6,
      numScroll: 3
    },
    {
      breakpoint: '768px',
      numVisible: 4,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];



get getFilteredMovies(): Array<IMovie> {
    return this.filterMoviesSignal()?.results as Array<IMovie>;
  }

  constructor() {
    this.fetchPopularMovies(this.popularMoviesPage)
    this.onSearchTextChanged();

    effect(() => {
      if(this.popularMoviesSignal() && !this.popularMovies?.results) {
        this.popularMoviesEffect();
      }
    });
    this.movieService.filteredMovies.set(null);
    effect(() => {
      if (this.filterMoviesSignal()) {
        this.filterMoviesEffect();
      }
    });
  }

  public loadMorePopularMovies(): void {
    this.fetchPopularMovies(this.popularMoviesPage += 1)
  }

  public loadMoreFilterMovies(): void {
    this.fetchFilterMovies(this.createFilterModel(this.searchTextControl.value, this.filterMoviesPage += 1));
  }

  private fetchPopularMovies(page: number) {
    this.movieService.getPopularMovies(page);
  }

  private fetchFilterMovies(filter : IMoviesSearchFilter) {
    this.movieService.getMoviesByFilter(filter)
  }

  private onSearchTextChanged(): void {
    this.searchTextControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value: string) => {
        this.isSearchTextChanged = true;
        this.filterMoviesPage = 1;
        this.fetchFilterMovies(this.createFilterModel(value, this.filterMoviesPage));
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
    if (this.popularMovies.page! > 1 || this.popularMoviesPage === this.popularMovies.total_pages) {
      this.deleteShowElseCard(this.popularMovies);
    }
  }

  private filterMoviesEffect(): void {
      this.filterMovies = {
        page: this.filterMoviesSignal()?.page,
        total_pages: this.filterMoviesSignal()?.total_pages,
        results: this.isSearchTextChanged || this.filterMovies?.results ? this.filterMoviesSignal()?.results : this.filterMovies ? [...this.filterMovies.results!, ...this.filterMoviesSignal()?.results!] : this.filterMoviesSignal()?.results,
        total_results: this.filterMoviesSignal()?.total_results,
      }
      if (this.filterMovies.page! > 1 && !this.isSearchTextChanged) {
        this.deleteShowElseCard(this.filterMovies);
      }
      if (this.filterMoviesPage === this.filterMovies.total_pages)
        this.deleteShowElseCard(this.filterMovies);

      this.isSearchTextChanged = false;
  }

  private deleteShowElseCard(response: IMoviesResponse): void {
    const firstShowElseIndex = response.results!.findIndex(movie => movie.showElse);
    if (firstShowElseIndex !== -1) {
      response.results!.splice(firstShowElseIndex, 1);
    }
  }

  private createFilterModel(query: string, page: number): IMoviesSearchFilter {
    return {
      query,
      page
    }
  }

  protected readonly environment = environment;
}
