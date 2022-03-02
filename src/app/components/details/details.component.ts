import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/Movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  productId: number = 0;
  movie: Movie = new Movie(0, '', '', 0, '', 0, []);
  movieIdsLSArray: number[] = [];

  constructor(private route: ActivatedRoute, private service: MovieService) {}

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.productId = +p['id'];
    });
    console.log(this.productId);

    let moviesArray = this.service.getMoviesArray();

    for (let i = 0; i < moviesArray.length; i++) {
      if (moviesArray[i].id === this.productId) {
        this.movie = moviesArray[i];
      }
    }

    this.service.getMovies();
  }
  putItemInBag(movieId: number) {
    this.saveToLs(movieId);
    alert('Produkt tillagd i varukorgen');

    // localStorage.setItem('id', movieId.toString());
  }

  saveToLs(movieId: number) {
    let movieArray: string = localStorage.getItem('id') || '[]';
    this.movieIdsLSArray = JSON.parse(movieArray);
    this.movieIdsLSArray.push(movieId);
    localStorage.setItem('id', JSON.stringify(this.movieIdsLSArray));
  }
}
