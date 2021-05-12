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
  private baseUrl = 'http://localhost:3000/meals';

  constructor(private httpClient: HttpClient) { }

  getMeal(id: string): Observable<Meal> {
    return this.httpClient.get<Meal>(`${this.baseUrl}/${id}`);
  }

  getMealList(): Observable<Meal[]> {
    return this.httpClient.get<Meal[]>(this.baseUrl)
      .pipe(
        switchMap(meals => {
          this.mealsSubject.next(meals);
          return this.mealsSubject.asObservable();
        }));
  }

  addMeal(newMeal: Meal): Observable<Meal> {
    return this.httpClient.post<Meal>(this.baseUrl, newMeal)
      .pipe(
        tap(createdMeal => this.mealsSubject.next([...this.mealsSubject.value, createdMeal]))
      );
  }

  updateMeal(mealToUpdate: Meal): Observable<Meal> {
    return this.httpClient.patch<Meal>(`${this.baseUrl}/${mealToUpdate.id}`, mealToUpdate)
      .pipe(
        tap(updatedMeal => {
          const meals = this.mealsSubject.value.filter(m => m.id !== updatedMeal.id);
          meals.push(updatedMeal);
          this.mealsSubject.next(meals);
        })
      );
  }

  deleteMeal(id: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`)
      .pipe(
        tap(res => {
          const meals = this.mealsSubject.value.filter(m => m.id !== id);
          this.mealsSubject.next(meals);
        })
      );
  }

}
