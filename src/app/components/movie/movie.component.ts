import { Component, Input, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { IProductCategory } from 'src/app/models/IProductCategory';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  // movieId = 0;
  @Input() movie: Movie = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    year: 0,
    productCategory: [{ categoryId: 0, category: null }],
  };

  constructor() {}

  // extendedInfoMovie(movieId: number) {
  //   console.log(movieId);
  //   this.movieId = movieId;
  // this.route.params.pipe();
  // }

  ngOnInit(): void {}
}
