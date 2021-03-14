import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastDrawedMealsComponent } from './last-drawed-meals.component';

describe('LastDrawedMealsComponent', () => {
  let component: LastDrawedMealsComponent;
  let fixture: ComponentFixture<LastDrawedMealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastDrawedMealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastDrawedMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
