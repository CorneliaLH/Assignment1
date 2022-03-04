import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { ShoppingbagComponent } from './shoppingbag.component';

describe('ShoppingbagComponent', () => {
  let component: ShoppingbagComponent;
  let fixture: ComponentFixture<ShoppingbagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShoppingbagComponent],
      providers: [
        FormBuilder,
        MovieService,
        HttpClientModule,
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingbagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain at  least one payment method', () => {
    const payment = component.payment;
    expect(payment.length).toBeGreaterThan(0);
  });
});
