import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastDrawedMealComponent } from './last-drawed-meal.component';

describe('LastDrawedMealComponent', () => {
  let component: LastDrawedMealComponent;
  let fixture: ComponentFixture<LastDrawedMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastDrawedMealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastDrawedMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
