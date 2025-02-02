import {Component, Input} from '@angular/core';
import {IMovie} from '../../core/interface/movie/movie.interface';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss'
})
export class MovieComponent {
  @Input() movie: IMovie;
  @Input() imageUrl: string;
  @Input() mainBanner: boolean;

  get getImageUrl(): string {
    return this.movie?.poster_path ? this.imageUrl + this.movie?.poster_path : './assets/images/no-image.png';
  }
}
