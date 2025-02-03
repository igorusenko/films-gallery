import {Component, computed, effect, inject} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {MovieService} from '../../core/services/movie.service';
import {environment} from '../../environment/environment';
import {IGen, IMovie} from '../../core/interface/movie/movie.interface';
import {Rating} from 'primeng/rating';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Button} from 'primeng/button';
import {fadeInAnimation} from '../../core/animations/fadeIn';

@Component({
  selector: 'app-movie-detail',
  imports: [
    Rating,
    FormsModule,
    NgForOf,
    NgIf,
    Button,
    RouterLink
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
  animations: [fadeInAnimation]
})
export class MovieDetailComponent {
  public movieId = computed(() => Number(this.paramMap()?.get('id')) ?? null);
  public voteAverage: number = 4
  public homePage: string;
  private route = inject(ActivatedRoute);
  private movieService = inject(MovieService);  private paramMap = toSignal(this.route.paramMap);

  public get movie(): IMovie | null {
    return this.movieService.movieById();
  }

  public get genres(): string {
    return this.movie?.genres!.map(x => x.name)!.join(', ')!;
  }

  constructor() {
    this.movieService.getMovieById(this.movieId());
    effect(() => {
      this.voteAverage = this.movie?.vote_average!;
      this.homePage = this.movie?.homepage!;
    });
  }

  protected readonly environment = environment;
}
