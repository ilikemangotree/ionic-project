import { LocalStorageService } from './../../shared/services/local-storage.service';
import { CATEGORIES } from './../../shared/class/mock.category';
import { Injectable } from '@angular/core';
import { AjaxResult } from '../../shared/class/ajax-result';


@Injectable({
  providedIn: 'root'
})
export class CategoryListService {
  constructor(private localStorageService: LocalStorageService) { }
  async getAll(): Promise<AjaxResult> {
    const categories = this.localStorageService.get('Category', CATEGORIES);
    return {
      targetUrl: '',
      result: categories,
      success: true,
      error: null,
      unAuthorizedRequest: false
    };
  }
}
