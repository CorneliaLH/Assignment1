import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/Movie';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  productId: number = 0;
  movie: Movie = new Movie(0, '', '', 0, '', 0, []);
  moviesArray: Movie[] = [];
  // movieIdsLSArray: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: MovieService,
    private serviceLS: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((p) => {
      this.productId = +p['id'];
    });
    console.log(this.productId);

    this.service.movies$.subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === this.productId) {
          this.movie = data[i];
          console.log(this.movie);
        }
      }
    });

    this.service.getMovies();
  }
  putItemInBag(movieId: number) {
    // this.saveToLs(movieId);
    this.serviceLS.saveToLocalStorage(movieId);
    alert('Produkt tillagd i varukorgen');

    // localStorage.setItem('id', movieId.toString());
  }

  // saveToLs(movieId: number) {
  //   let movieArray: string = localStorage.getItem('id') || '[]';
  //   this.movieIdsLSArray = JSON.parse(movieArray);
  //   this.movieIdsLSArray.push(movieId);
  //   localStorage.setItem('id', JSON.stringify(this.movieIdsLSArray));
  // }
}
