import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateMealFormComponent } from './create-or-update-meal-form.component';

describe('EditMealFormComponent', () => {
  let component: CreateOrUpdateMealFormComponent;
  let fixture: ComponentFixture<CreateOrUpdateMealFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOrUpdateMealFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateMealFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
