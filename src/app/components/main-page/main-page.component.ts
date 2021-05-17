import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  lastDrawedMeals: Meal[] = [];
  plannedMeals: Meal[] = [
    { name: "", ingredients: [], imageUrl: "" },
    { name: "", ingredients: [], imageUrl: "" },
    { name: "", ingredients: [], imageUrl: "" },
    { name: "", ingredients: [], imageUrl: "" },
    { name: "", ingredients: [], imageUrl: "" },
    { name: "", ingredients: [], imageUrl: "" },
    { name: "", ingredients: [], imageUrl: "" }
  ];

  constructor(private mealService: MealService) { }

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
  }

  drop(event: CdkDragDrop<Meal[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.plannedMeals[event.currentIndex] = this.lastDrawedMeals[event.previousIndex];
    }
  }
}

