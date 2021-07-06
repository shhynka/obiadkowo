import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrUpdateMealFormComponent } from './components/create-or-update-meal-form/create-or-update-meal-form.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LogInPageComponent } from './components/log-in-page/log-in-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MealListComponent } from './components/meal-list/meal-list.component';
import { MealViewComponent } from './components/meal-view/meal-view.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['log-in-page']);

const routes: Routes = [{
  path: '', component: MainPageComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
},
{
  path: 'meal-list', component: MealListComponent, canActivate: [AngularFireAuthGuard]
},
{
  path: 'log-in-page', component: LogInPageComponent
},
{
  path: 'meal/new-meal', component: CreateOrUpdateMealFormComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
},
{
  path: 'meal/:id/edit', component: CreateOrUpdateMealFormComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
},
{
  path: 'meal/:id/view', component: MealViewComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }
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
