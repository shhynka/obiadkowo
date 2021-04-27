import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMealComponent } from './new-meal.component';

describe('NewMealComponent', () => {
  let component: NewMealComponent;
  let fixture: ComponentFixture<NewMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
