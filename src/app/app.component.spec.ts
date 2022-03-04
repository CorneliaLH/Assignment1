import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';

// import { By } from '';

describe('AppComponent', () => {
  let component: AppComponent;
  let de: DebugElement;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Assignment1'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Assignment1');
  });

  //Nya test
  it('should have a logo', () => {
    expect(de.query(By.css('div')).nativeElement.innerText).toBe('Logo');
  });
});
