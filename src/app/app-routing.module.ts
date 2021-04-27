import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LogInPageComponent } from './components/log-in-page/log-in-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MealListComponent } from './components/meal-list/meal-list.component';
import { NewMealComponent } from './components/new-meal/new-meal.component';

const routes: Routes = [{
  path: '', component: MainPageComponent
},
{
  path: 'meal-list', component: MealListComponent
},
{
  path: 'log-in-page', component: LogInPageComponent
},
{
  path: 'meal-list/new-meal', component: NewMealComponent
},
{
  path: '**', component: ErrorPageComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
