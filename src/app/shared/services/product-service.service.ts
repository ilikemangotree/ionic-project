import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { AjaxResult } from '../class/ajax-result';
import { Product } from '../class/product';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }
  async insert(input: Product): Promise<AjaxResult>  {
    input.id = UUID.UUID(); // 自动生成ID
    const res = this.localStorageService.get('product', []);
    res.push(input);
    this.localStorageService.set('product', res);
    return {
      targetUrl: '',
      result: res,
      success: true,
      error: null,
      unAuthorizedRequest: false,
    };
  }
  autoIncrement(array: Product[]): string {
    if (array.length === 0) { return ''; }
    const new_id = array[length - 1].id + 1;
    return new_id;
  }
}
