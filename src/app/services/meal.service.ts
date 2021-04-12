import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Meal } from '../models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private mealsSubject: BehaviorSubject<Meal[]> = new BehaviorSubject([]);
  private baseUrl = "http://localhost:3000/meals";

  constructor(private httpClient: HttpClient) { }

  getMeal(meal: Meal): Observable<Meal> {
    return this.httpClient.get<Meal>(`${this.baseUrl}/${meal.id}`);
  }

  getMealList(): Observable<Meal[]> {
    return this.httpClient.get<Meal[]>(this.baseUrl)
      .pipe(
        switchMap(meals => {
          this.mealsSubject.next(meals);
          return this.mealsSubject.asObservable();
        }))
  }

  addMeal(newMeal: Meal) {
    return this.httpClient.post<Meal>(this.baseUrl, newMeal)
      .pipe(tap(newMeal => {
        console.log(newMeal);
        this.mealsSubject.next([...this.mealsSubject.value, newMeal])
      }
      ))
  }

  updateMeal(mealToUpdate: Meal) {
    return this.httpClient.patch<Meal>(`${this.baseUrl}/${mealToUpdate.id}`, mealToUpdate)
      .pipe(tap(res => {
        console.log(res);
        let meals = this.mealsSubject.value.filter(m => m.id !== mealToUpdate.id);
        meals.push(mealToUpdate);
        this.mealsSubject.next(meals);
      }))
  }

  deleteMeal(id: string) {
    return this.httpClient.delete<Meal>(`${this.baseUrl}/${id}`)
      .pipe(tap(res => {
        console.log(res);
        let meals = this.mealsSubject.value.filter(m => m.id !== id);
        this.mealsSubject.next(meals);
      }))
  }

}




