import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  HttpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });
    service = TestBed.inject(ProductService);
  });

  // it('should retrieve all movies', () => {
  //   service.getMovies();
  //   expect(service.moviesList.length).toBeGreaterThan(0);
  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
