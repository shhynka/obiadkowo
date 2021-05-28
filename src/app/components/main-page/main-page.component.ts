import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  lastDrawedMeals: Meal[] = [];
  plannedMeals: { date: Date, meal: Meal }[] = [];

  constructor(private mealService: MealService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.mealService.getMealList().pipe(map(meals => {
      return meals.sort((m1, m2) => {
        if (m1.lastDrawDate < m2.lastDrawDate) {
          return 1;
        }
        if (m1.lastDrawDate > m2.lastDrawDate) {
          return -1;
        }
        return 0
      }).slice(0, 7)
    })).subscribe((meals) => {
      this.lastDrawedMeals = meals;
    });

    this.mealService.getMealPlan().subscribe((meals) => {
      this.plannedMeals = meals;
    })
  }


  // drop(event: CdkDragDrop<Meal[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     let oldTarget = this.lastDrawedMeals[event.previousIndex];
  //     this.lastDrawedMeals[event.previousIndex] = this.plannedMeals[event.currentIndex];
  //     this.plannedMeals[event.currentIndex] = oldTarget;

  //   }
  // }
}

