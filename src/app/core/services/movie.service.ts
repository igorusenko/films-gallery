import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environment/environment';
import {IMovie, IMoviesResponse, IMoviesSearchFilter} from '../interface/movie/movie.interface';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  popularMovies = signal<IMoviesResponse | null>(null);
  filteredMovies = signal<IMoviesResponse | null>(null);
  movieById = signal<IMovie | null>(null);

  public getPopularMovies(page: number) {
    this.http.get<IMoviesResponse>(`${environment.apiUrl}/movie/popular?language=en-US&page=${page}`)
      .pipe(map(response => {
        response.results!.push({showElse: true})
        return response;
      }))
      .subscribe(response => this.popularMovies.set(response));
  }

  public getMoviesByFilter(filter: IMoviesSearchFilter) {
    let params = new HttpParams();

    for (const key in filter) {
      if (filter.hasOwnProperty(key)) {
        const value = filter[key as keyof IMoviesSearchFilter];
        if (value !== undefined && value !== null) {
          params = params.set(key, value.toString());
        }
      }
    }

    this.http.get<IMoviesResponse>(`${environment.apiUrl}/search/movie`, {params})
      .pipe(map(response => {
        response.results!.push({showElse: true})
        return response;
      }))
      .subscribe(response => this.filteredMovies.set(response));
  }

  public getMovieById(id: number) {
    this.http.get<IMovie>(`${environment.apiUrl}/movie/${id}`)
      .subscribe(movie => this.movieById.set(movie));
  }

}
