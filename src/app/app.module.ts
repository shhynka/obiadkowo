import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { MenuComponent } from './components/menu/menu.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LastDrawedMealsComponent } from './components/last-drawed-meals/last-drawed-meals.component';
import { HttpClientModule } from '@angular/common/http';
import { LastDrawedMealComponent } from './components/last-drawed-meal/last-drawed-meal.component';
import { MealListComponent } from './components/meal-list/meal-list.component';
import { MealComponent } from './components/meal/meal.component';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

registerLocaleData(localePl, "pl");

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainPageComponent,
    LastDrawedMealsComponent,
    LastDrawedMealComponent,
    MealListComponent,
    MealComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
