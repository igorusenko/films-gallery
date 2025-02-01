import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {IMovie} from '../interface/movie/movie.interface';
import {catchError, of, switchMap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);
  movies = signal<IMovie[]>([]);

  private readonly API_URL = `${environment.apiUrl}/movie/popular?language=en-US&page=1`;

  fetchMovies() {
    this.http.get<{ results: IMovie[] }>(this.API_URL)
      .pipe(
        switchMap(response => of(response.results)),
        catchError(() => of([]))
      )
      .subscribe(movies => this.movies.set(movies));
  }

}
