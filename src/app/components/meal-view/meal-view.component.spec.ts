import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealViewComponent } from './meal-view.component';

describe('MealViewComponent', () => {
  let component: MealViewComponent;
  let fixture: ComponentFixture<MealViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
