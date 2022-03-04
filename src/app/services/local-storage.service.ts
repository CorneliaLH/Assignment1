import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  movieIdsLSArray: number[] = [];
  constructor() {}

  saveToLocalStorage(movieId: number) {
    let movieArray: string = localStorage.getItem('id') || '[]';
    this.movieIdsLSArray = JSON.parse(movieArray);
    this.movieIdsLSArray.push(movieId);
    localStorage.setItem('id', JSON.stringify(this.movieIdsLSArray));
  }

  setItemLS() {
    return localStorage.setItem('id', JSON.stringify(this.movieIdsLSArray));
  }

  getItemLS() {
    let movieArray: string = localStorage.getItem('id') || '[]';
    this.movieIdsLSArray = JSON.parse(movieArray);
    console.log(this.movieIdsLSArray);
    return this.movieIdsLSArray;
  }

  emptyLocalStorage() {
    localStorage.removeItem('id');
    return [];
  }
}
