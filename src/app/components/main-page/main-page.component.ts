import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { PlannedMeal } from 'src/app/models/plannedMeal.model';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  plannedMeals: PlannedMeal[] = [];
  username: string;

  constructor(private mealService: MealService, private auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.mealService.getMealPlan().subscribe((meals) => {
      this.plannedMeals = meals;
    })
  }
}

