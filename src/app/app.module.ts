import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { MenuComponent } from './components/menu/menu.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';
import { MealListComponent } from './components/meal-list/meal-list.component';
import { MealComponent } from './components/meal/meal.component';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInPageComponent } from './components/log-in-page/log-in-page.component';
import { LogInFormComponent } from './components/log-in-form/log-in-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DragAndDropDirective } from './directives/drag-and-drop.directive';
import { QuillModule } from 'ngx-quill';
import { IngredientFormDialogComponent } from './components/ingredient-form-dialog/ingredient-form-dialog.component';
import { MealViewComponent } from './components/meal-view/meal-view.component';
import { CreateOrUpdateMealFormComponent } from './components/create-or-update-meal-form/create-or-update-meal-form.component';
import { DeleteMealDialogComponent } from './components/delete-meal-dialog/delete-meal-dialog.component';
import { DrawDialogComponent } from './components/draw-dialog/draw-dialog.component';

registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainPageComponent,
    MealListComponent,
    MealComponent,
    LogInPageComponent,
    LogInFormComponent,
    RegistrationFormComponent,
    ErrorPageComponent,
    DragAndDropDirective,
    IngredientFormDialogComponent,
    MealViewComponent,
    CreateOrUpdateMealFormComponent,
    DeleteMealDialogComponent,
    DrawDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        syntax: false,
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'align': [] }],
          ['link', 'image', 'video']
        ]
      }
    })
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
  bootstrap: [AppComponent],
  entryComponents: [IngredientFormDialogComponent, DeleteMealDialogComponent]
})
export class AppModule { }
