import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';

describe('MovieseService', () => {
  let service: MovieService;
  HttpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });
    service = TestBed.inject(MovieService);
  });

  // it('should retrieve all movies', () => {
  //   service.getMovies();
  //   expect(service.moviesList.length).toBeGreaterThan(0);
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
