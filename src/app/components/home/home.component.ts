import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/Movie';
import { MovieService } from 'src/app/services/movie.service';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  animations: [
    trigger('enterAnimation', [
      transition('void => *', [
        style({ opacity: 0 }), //style only for transition transition (after transiton it removes)
        animate(1000, style({ opacity: 1 })), // the new state of the transition(after transiton it removes)
      ]),
      transition('* => void', [
        animate(1000, style({ opacity: 0 })), // the new state of the transition(after transiton it removes)
      ]),
    ]),
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movieURL: string =
    'https://images-na.ssl-images-amazon.com/images/M/MV5BMTYxNDA3MDQwNl5BMl5BanBnXkFtZTcwNTU4Mzc1Nw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg';
  movies: Movie[] = [];
  fade: string = 'is-loaded';
  toggle: boolean = true;
  constructor(private service: MovieService) {}
  toggleElement() {
    this.toggle = !this.toggle;
  }
  ngOnInit(): void {
    this.service.movies$.subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        let movie = data[i].imageUrl;
        setTimeout(() => {
          this.toggle = !this.toggle;
          this.movieURL = movie;
        }, 2000 * (i + 1));
      }
    });
    this.service.getMovies();
  }
}
