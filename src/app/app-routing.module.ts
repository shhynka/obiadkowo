import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrUpdateMealFormComponent } from './components/create-or-update-meal-form/create-or-update-meal-form.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LogInPageComponent } from './components/log-in-page/log-in-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MealListComponent } from './components/meal-list/meal-list.component';
import { MealViewComponent } from './components/meal-view/meal-view.component';

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
  path: 'meal/new-meal', component: CreateOrUpdateMealFormComponent
},
{
  path: 'meal/:id/edit', component: CreateOrUpdateMealFormComponent
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
