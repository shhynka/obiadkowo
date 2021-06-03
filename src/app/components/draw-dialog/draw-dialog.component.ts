import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    this.randomMeal = this.mealService.getRandomMeal();
  }

  planMeal() {
    this.matDialogRef.close(this.randomMeal);
  }

  closeDialog() {
    this.matDialogRef.close();
  }

}
