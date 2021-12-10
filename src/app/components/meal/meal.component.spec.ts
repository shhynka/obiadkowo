import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatDialogModule } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { environment } from 'src/environments/environment';

import { MealComponent } from './meal.component';

describe('MealComponent', () => {
  let component: MealComponent;
  let fixture: ComponentFixture<MealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MealComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        MaterialModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MealComponent);
    component = fixture.componentInstance;
    component.meal = {
      name: "Test",
      imageUrl: "",
      imagePath: "",
      plannedDates: []
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have button disabled if date is invalid', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('.btn');
    expect(element.hasAttribute('disabled')).toEqual(true);
  });

  it('should have button enabled if date is not invalid', () => {
    component.date.setValue(new Date('2020-06-05'));
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement.querySelector('.btn');
    expect(element.hasAttribute('disabled')).toEqual(false);
  });
});
