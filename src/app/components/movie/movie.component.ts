import {Component, Input} from '@angular/core';
import {IMovie} from '../../core/interface/movie/movie.interface';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-movie',
  imports: [
    RouterLink
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {
  @Input() movie: IMovie;
  @Input() imageUrl: string;
  @Input() mainBanner: boolean;

  get getImageUrl(): string {
    return this.movie?.poster_path ? this.imageUrl + this.movie?.poster_path : '/no-image.jpg';
  }
}
