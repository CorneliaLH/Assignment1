import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { DetailsComponent } from './components/details/details.component';
import { AdminComponent } from './components/admin/admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { HttpClientModule } from '@angular/common/http';
import { MovieComponent } from './components/movie/movie.component';
import { ReactiveFormsModule } from '@angular/forms';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DarkenDirective } from './directives/darken.directive';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    DetailsComponent,
    AdminComponent,
    NotFoundComponent,
    MovieComponent,
    ShoppingcartComponent,
    DarkenDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
