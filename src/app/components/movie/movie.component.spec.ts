import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from 'src/app/models/Product';

import { MovieComponent } from './movie.component';

describe('MovieComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieComponent, TestHostComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain price', () => {
    let compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.innerHTML).toBe(100 + ' kronor');
  });
});
@Component({
  template: `<app-movie [product]="dataToSend"></app-movie>`,
})
class TestHostComponent {
  dataToSend: Product = new Product(1, 'Name1', '', 100, '', 1900, []);
}
