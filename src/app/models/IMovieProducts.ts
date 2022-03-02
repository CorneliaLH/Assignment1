import { Observable } from 'rxjs';
import { Movie } from './Movie';

export interface IMovieProducts {
  movies$: Observable<Movie[]>;

  getMovies(): void;
}
