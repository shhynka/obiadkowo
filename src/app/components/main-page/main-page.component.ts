import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  plannedMeals: { date: Date, meals: Meal[] }[] = [];

  constructor(private mealService: MealService) { }

  ngOnInit(): void {
    this.mealService.getMealPlan().subscribe((meals) => {
      this.plannedMeals = meals;
    })
  }
}

