import { Component, OnInit } from '@angular/core';
import { PlannedMeal } from 'src/app/models/plannedMeal.model';
import { MealService } from 'src/app/services/meal.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  plannedMeals: PlannedMeal[] = [];
  username: string;

  constructor(private mealService: MealService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      this.username = user.username;
    })

    this.mealService.getMealPlan().subscribe((meals) => {
      this.plannedMeals = meals;
    });
  }
}

