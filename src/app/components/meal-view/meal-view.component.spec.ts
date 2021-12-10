import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/material.module';
import { environment } from 'src/environments/environment';

import { MealViewComponent } from './meal-view.component';

describe('MealViewComponent', () => {
  let component: MealViewComponent;
  let fixture: ComponentFixture<MealViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealViewComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        RouterTestingModule,
        MaterialModule
      ]
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
