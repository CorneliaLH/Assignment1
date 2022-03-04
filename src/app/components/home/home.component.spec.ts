import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { HomeComponent } from './home.component';
import { MovieService } from 'src/app/services/movie.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Movie } from 'src/app/models/Movie';
import { Injector } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        MovieService,
        HttpClientModule,
        HttpClient,
        HttpHandler,
        trigger,
        state,
        style,
        animate,
        transition,
        Movie,
        Injector,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
