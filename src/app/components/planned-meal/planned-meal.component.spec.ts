import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MaterialModule } from 'src/app/material.module';
import { environment } from 'src/environments/environment';

import { PlannedMealComponent } from './planned-meal.component';

describe('PlannedMealComponent', () => {
  let component: PlannedMealComponent;
  let fixture: ComponentFixture<PlannedMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlannedMealComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        MaterialModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlannedMealComponent);
    component = fixture.componentInstance;
    component.plannedMeal = {
      date: new Date('2021-12-09'),
      meals: [{ name: 'test', imageUrl: '', imagePath: '' }],
      isDrawPossible: true

    }
    component.currentIndex = 0;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increment index when next meal is clicked', () => {
    component.displayNextMeal();
    expect(component.currentIndex).toBe(1);
  })

  it('should not increment index over max value', () => {
    component.displayNextMeal();
    component.displayNextMeal();
    expect(component.currentIndex).toBe(1);
  })

  it('should decrement index when previous meal is clicked', () => {
    component.currentIndex = 1;
    fixture.detectChanges();

    component.displayPreviousMeal();
    expect(component.currentIndex).toBe(0);
  })

  it('should not decrement index below minimum value', () => {
    component.displayPreviousMeal();
    expect(component.currentIndex).toBe(0);
  })
});
