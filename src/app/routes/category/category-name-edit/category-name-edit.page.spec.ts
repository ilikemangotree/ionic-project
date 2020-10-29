import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNameEditPage } from './category-name-edit.page';

describe('CategoryNameEditPage', () => {
  let component: CategoryNameEditPage;
  let fixture: ComponentFixture<CategoryNameEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryNameEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryNameEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
