import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Meal } from '../models/meal.model';
import * as moment from 'moment';
import { PlannedMeal } from '../models/plannedMeal.model';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private mealsSubject: BehaviorSubject<Meal[]> = new BehaviorSubject([]);
  private baseUrl = 'http://localhost:3000/meals';

  constructor(private httpClient: HttpClient) {
    this.getMealList().subscribe();
  }

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
        tap(() => {
          const meals = this.mealsSubject.value.filter(m => m.id !== id);
          this.mealsSubject.next(meals);
        })
      );
  }

  getMealPlan(): Observable<PlannedMeal[]> {
    return this.mealsSubject.pipe(
      map(meals => {
        let filteredMealList = meals.filter(meal =>
          meal.plannedDates.some(plannedDate => {
            const currentDate = moment();
            const planD = moment(plannedDate);
            const dayDifference = planD.diff(currentDate, "days");
            return 0 <= dayDifference && dayDifference <= 7
          })
        );
        let dateList: moment.Moment[] = [];
        dateList.push(moment());

        for (let i = 1; i < 7; i++) {
          dateList.push(moment().add(i, "days"));
        }

        return dateList.map(date => {
          let foundMeals = filteredMealList.filter(meal => meal.plannedDates.some(plannedDate => moment(plannedDate).isSame(date, "day")));
          return { date: date.toDate(), meals: foundMeals }
        });
      }
      ));
  }

  getRandomMeal() {
    const actualListOfMeals = this.mealsSubject.value.slice();
    let randomIndex = Math.floor(Math.random() * actualListOfMeals.length);
    return actualListOfMeals[randomIndex];
  }
}

