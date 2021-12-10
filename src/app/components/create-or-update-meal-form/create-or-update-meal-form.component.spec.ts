import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { environment } from 'src/environments/environment';

import { CreateOrUpdateMealFormComponent } from './create-or-update-meal-form.component';

describe('EditMealFormComponent', () => {
  let component: CreateOrUpdateMealFormComponent;
  let fixture: ComponentFixture<CreateOrUpdateMealFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOrUpdateMealFormComponent],
      imports: [
        RouterTestingModule,
        MaterialModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        NoopAnimationsModule
      ]
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

  it('should display alert when user did not enter name', () => {
    component.name.markAsTouched();
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement.querySelector('.error-msg div');
    expect(element.textContent).toContain('Pole wymagane');
  });

  it('should display alert when user entered name which length is below min length', () => {
    component.name.setValue('ab');
    component.name.markAsTouched();
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement.querySelector('.error-msg div');
    expect(element.textContent).toContain('Pole powinno zawierać od 3 do 50 liter.');
  });

  it('should display alert when user entered name which length is over max length', () => {
    component.name.setValue('testuje piecdziesiat znakow w tytule i jeszcze mi brakuje');
    component.name.markAsTouched();
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement.querySelector('.error-msg div');
    expect(element.textContent).toContain('Pole powinno zawierać od 3 do 50 liter.');
  });

  it('should display alert when user entered name containing numbers', () => {
    component.name.setValue('test 23');
    component.name.markAsTouched();
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement.querySelector('.error-msg div');
    expect(element.textContent).toContain('Pole zawiera niedopuszczalne znaki. Pole powinno zawierać tylko litery.');
  });

  it('should display different headers when editing meal', () => {
    let route = jasmine.createSpyObj('Route', ['']);
    route.params = {
      id: '1234'
    }
    console.log(route);
    fixture.detectChanges();


    const element: HTMLElement = fixture.nativeElement.querySelector('.name-container h3');
    console.log(element.textContent);
    expect(element.textContent).toContain('Edytuj obiad');

  })

  // czy mogą być dwa describe?
});
