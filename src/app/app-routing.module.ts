import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateOrUpdateMealFormComponent } from './components/create-or-update-meal-form/create-or-update-meal-form.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { LogInPageComponent } from './components/log-in-page/log-in-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MealListComponent } from './components/meal-list/meal-list.component';
import { MealViewComponent } from './components/meal-view/meal-view.component';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { canActivate } from '@angular/fire/auth-guard';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['log-in-page']);

const routes: Routes = [{
  path: '', component: MainPageComponent, ...canActivate(redirectUnauthorizedToLogin)
},
{
  path: 'meal-list', component: MealListComponent, ...canActivate(redirectUnauthorizedToLogin)
},
{
  path: 'log-in-page', component: LogInPageComponent
},
{
  path: 'meal/new-meal', component: CreateOrUpdateMealFormComponent, ...canActivate(redirectUnauthorizedToLogin)
},
{
  path: 'meal/:id/edit', component: CreateOrUpdateMealFormComponent, ...canActivate(redirectUnauthorizedToLogin)
},
{
  path: 'meal/:id/view', component: MealViewComponent, ...canActivate(redirectUnauthorizedToLogin)
},
{
  path: 'auth/forgot-password', component: ForgotPasswordComponent
},
{
  path: 'auth/reset-password', component: PasswordResetComponent
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
