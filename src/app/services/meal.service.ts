import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Meal } from '../models/meal.model';
import * as moment from 'moment';

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

  getMealPlan(): Observable<{ date: Date, meal: Meal }[]> {
    return this.mealsSubject.pipe(
      map(meals => {
        let filteredMealList = meals.filter(meal =>
          meal.plannedDates.some(plannedDate => {
            const currentDate = moment();
            const planD = moment(plannedDate); // konwertujemy date do obiektu typu moment
            const dayDifference = planD.diff(currentDate, "days");
            return 0 <= dayDifference && dayDifference <= 7
          })
        ); // tworzę listę posiłków, które zawierają daty z zakresu dzisiaj - 6 dni do przodu
        console.log("filteredMealList:", filteredMealList);
        let dateList: moment.Moment[] = [];
        dateList.push(moment());

        for (let i = 1; i < 7; i++) {
          dateList.push(moment().add(i, "days")); // tworzę listę dat: dzisiaj i 6 kolejnych dni
        }

        return dateList.map(date => {
          let foundMeal = filteredMealList.find(meal => meal.plannedDates.some(plannedDate => moment(plannedDate).isSame(date, "day")));
          return { date: date.toDate(), meal: foundMeal }
        }); // mapuję/kopiuję listę dat i dopasowuję konkretny posiłek do konkretnej daty i zwracam obiekt, który ma te dwie propercje. W ten sposób tworzy się nowa lista z maksymalnie 7 elementami
      }
      ));

    // przypisz to do zmiennej (filtr)
    // stwórz sobie array dat
    // na tym array dat zrób sobie map na tym arrayu i znajdź posiłek, który odpowiada danej dacie jak nie ma to przypisz null => tak powinien wyglądać pojedynczy wpis ({date: Date, meal: Meal})
  }

}
