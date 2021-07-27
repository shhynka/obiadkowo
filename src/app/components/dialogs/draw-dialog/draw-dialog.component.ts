import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-draw-dialog',
  templateUrl: './draw-dialog.component.html',
  styleUrls: ['./draw-dialog.component.scss']
})
export class DrawDialogComponent implements OnInit {

  randomMeal: Meal;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<DrawDialogComponent>,
    private mealService: MealService) { }

  ngOnInit(): void {
    this.mealService.getRandomMeal(this.data.date).subscribe(meal => {
      this.randomMeal = meal;
    });
  }

  planMeal(): void {
    this.matDialogRef.close(this.randomMeal);
  }

  closeDialog(): void {
    this.matDialogRef.close();
  }

}
