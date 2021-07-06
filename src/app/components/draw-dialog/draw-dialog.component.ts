import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-draw-dialog',
  templateUrl: './draw-dialog.component.html',
  styleUrls: ['./draw-dialog.component.scss']
})
export class DrawDialogComponent implements OnInit {

  randomMeal: Meal;

  constructor(private matDialogRef: MatDialogRef<DrawDialogComponent>, private mealService: MealService) { }

  ngOnInit(): void {
    this.mealService.getRandomMeal().subscribe(meal => {
      this.randomMeal = meal;
    });
  }

  planMeal() {
    this.matDialogRef.close(this.randomMeal);
  }

  closeDialog() {
    this.matDialogRef.close();
  }

}
