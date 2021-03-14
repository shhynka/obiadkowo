import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meal } from '../models/meal.model';

@Injectable({
  providedIn: 'root'
})
export class LastDrawedMealsService {

  meals: Meal[] = [
    { name: "spaghetti bolognese", imageUrl: "fff", lastDrawDate: new Date() },
    { name: "pierogi", imageUrl: "ddd", lastDrawDate: new Date() },
    { name: "tortilla", imageUrl: "hhh", lastDrawDate: new Date() },
    { name: "racuchy", imageUrl: "sss", lastDrawDate: new Date() }
  ]

  LastDrawedMeals: BehaviorSubject<Meal[]> = new BehaviorSubject(this.meals);

  constructor() { }
}
