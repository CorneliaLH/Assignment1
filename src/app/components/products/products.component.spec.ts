import {
  HttpClientModule,
  HttpClient,
  HttpHandler,
} from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { ProductService } from 'src/app/services/product.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockProductService } from 'src/app/services/mock-product.service';
import { FormBuilder, Validators } from '@angular/forms';
describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [ProductsComponent],
      providers: [
        FormBuilder,
        Validators,
        ProductService,
        HttpClientModule,
        HttpClient,
        HttpHandler,
        { provide: ProductService, useClass: MockProductService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a category with "Alla filmer"', () => {
    expect(de.query(By.css('.allProducts')).nativeElement.innerText).toBe(
      'Alla Filmer'
    );
  });
  it('should have six products', () => {
    expect(component.products.length).toBe(7);
  });

  it('should have four categories', () => {
    expect(component.category.length).toBe(2);
  });
});
