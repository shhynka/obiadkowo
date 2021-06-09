import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';
import { DeleteMealDialogComponent } from '../delete-meal-dialog/delete-meal-dialog.component';
import { DrawDialogComponent } from '../draw-dialog/draw-dialog.component';

@Component({
  selector: 'app-planned-meal',
  templateUrl: './planned-meal.component.html',
  styleUrls: ['./planned-meal.component.scss']
})
export class PlannedMealComponent implements OnInit {

  @Input() plannedMeal: { date: Date, meals: Meal[] };
  currentIndex: number = 0;

  constructor(private mealService: MealService, private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  displayNextMeal() {
    if (this.currentIndex + 1 < this.plannedMeal.meals.length + 1) {
      this.currentIndex++;
    }
  }

  displayPreviousMeal() {
    if (this.currentIndex - 1 >= 0) {
      this.currentIndex--;
    }
  }

  get currentMeal() {
    return this.plannedMeal.meals[this.currentIndex];
  }

  openDrawDialog(dateToPlanMeal: Date) {
    let dialogRef = this.matDialog.open(DrawDialogComponent);

    dialogRef.afterClosed().pipe(
      switchMap((result: Meal) => {
        if (result) {
          result.plannedDates.push(dateToPlanMeal);
          return this.mealService.updateMeal(result);
        }
        return EMPTY;
      })
    ).subscribe();
  }

  openDeleteFromMealPlanDialog(dateToDelete: Date) {
    let dialogRef = this.matDialog.open(DeleteMealDialogComponent);

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (result) {
        this.currentMeal.plannedDates = this.currentMeal.plannedDates.filter(date => !moment(date).isSame(dateToDelete, "day"));
        return this.mealService.updateMeal(this.currentMeal);
      }
      return EMPTY;
    })).subscribe();
  }
}
