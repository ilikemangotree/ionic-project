import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleServiceService {

  constructor() { }
  getSales(): number {
    return Math.random() * (9 - 100) + 100;
  }
}
