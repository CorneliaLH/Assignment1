import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ICategory } from '../models/ICategory';
import { IMovieProducts } from '../models/IMovieProducts';
import { IProductCategory } from '../models/IProductCategory';
import { Movie } from '../models/Movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService implements IMovieProducts {
  moviesList: Movie[] = [];
  constructor(private http: HttpClient) {}
  private movies = new Subject<Movie[]>();
  public movies$: Observable<Movie[]> = this.movies.asObservable();
  private category = new Subject<ICategory[]>();
  public categories$: Observable<ICategory[]> = this.category.asObservable();
  private searchMovie = new Subject<Movie[]>();
  public searchMovies$: Observable<Movie[]> = this.searchMovie.asObservable();

  getMoviesArray() {
    return this.moviesList;
  }
  getMovies(): void {
    this.http
      .get<Movie[]>(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/products'
      )
      .subscribe((data) => {
        this.moviesList = data;
        this.movies.next(data);
      });
  }
  getCategories(): void {
    this.http
      .get<ICategory[]>(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/categories'
      )
      .subscribe((data) => {
        this.category.next(data);
        console.log(data);
      });
  }
  searchForMovies(input: string) {
    this.http
      .get<Movie[]>(
        'https://medieinstitutet-wie-products.azurewebsites.net/api/search?=' +
          input
      )
      .subscribe((data: Movie[]) => {
        console.log(data);
        this.searchMovie.next(data);
      });
  }
}
