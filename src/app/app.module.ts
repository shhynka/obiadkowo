import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MainPageComponent,
    LastDrawedMealsComponent,
    LastDrawedMealComponent,
    MealListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
