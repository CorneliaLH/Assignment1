import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/models/ICategory';
// import { IProductCategory } from 'src/app/models/IProductCategory';
import { Movie } from 'src/app/models/Movie';
import { MovieService } from 'src/app/services/movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  movies: Movie[] = [];
  category: ICategory[] = [];
  moviesdisplayed: Movie[] = [];
  searchMovie: Movie[] = [];
  // productCategory: IProductCategory[] = [];

  constructor(
    private service: MovieService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  //Funktion för att välja filmer efter kategori

  enterCategory(id: number) {
    this.moviesdisplayed = [];
    this.movies.forEach((movie) => {
      for (let i = 0; i < movie.productCategory.length; i++) {
        if (movie.productCategory[i].categoryId === id) {
          this.moviesdisplayed.push(movie);
        }
      }
    });
  }
  //Söka efter film och visa resultat, om flera blir de som lista, om endast en
  //visas detaljer direkt
  searchForMovie(input: string) {
    this.service.searchMovies$.subscribe((data: Movie[]) => {
      if (data.length === 0) {
        this.router.navigate(['**']);
      } else if (data.length === 1) {
        this.searchMovie = data;
        this.searchMovie.forEach((movie) => {
          this.router.navigate(['/products', movie.id]);
        });
      } else {
        this.moviesdisplayed = data;
      }
    });
    this.service.searchForMovies(input);
  }

  //hämtar kategorier och filmer från service
  ngOnInit(): void {
    this.service.movies$.subscribe((data: Movie[]) => {
      this.movies = data;
    });

    this.service.categories$.subscribe((data: ICategory[]) => {
      this.category = data;
    });
    this.service.getCategories();
    this.service.getMovies();
  }
}
