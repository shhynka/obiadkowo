import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-meal-view',
  templateUrl: './meal-view.component.html',
  styleUrls: ['./meal-view.component.scss']
})
export class MealViewComponent implements OnInit {

  id: string;
  meal: Meal;
  ingredients: string[];
  image: string;

  constructor(private mealService: MealService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;

    this.mealService.getMeal(this.id).subscribe((meal: Meal) => {
      this.meal = meal;
      this.ingredients = meal.ingredients;
      this.image = meal.imageUrl;
    });
  }
}
