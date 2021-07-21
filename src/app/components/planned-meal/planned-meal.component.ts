import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Meal } from 'src/app/models/meal.model';
import { PlannedMeal } from 'src/app/models/plannedMeal.model';
import { MealService } from 'src/app/services/meal.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DrawDialogComponent } from '../draw-dialog/draw-dialog.component';

@Component({
  selector: 'app-planned-meal',
  templateUrl: './planned-meal.component.html',
  styleUrls: ['./planned-meal.component.scss']
})
export class PlannedMealComponent implements OnInit {

  @Input() plannedMeal: PlannedMeal;
  meals: Observable<Meal[]>;
  currentIndex = 0;

  constructor(private mealService: MealService, private matDialog: MatDialog, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.meals = this.mealService.getMealList();
  }

  displayNextMeal(): void {
    if (this.currentIndex + 1 < this.plannedMeal.meals.length + 1) {
      this.currentIndex++;
    }
  }

  displayPreviousMeal(): void {
    if (this.currentIndex - 1 >= 0) {
      this.currentIndex--;
    }
  }

  get currentMeal(): Meal {
    return this.plannedMeal.meals[this.currentIndex];
  }

  openDrawDialog(dateToPlanMeal: Date): void {
    const dialogRef = this.matDialog.open(DrawDialogComponent, {
      data: { date: dateToPlanMeal }
    });

    dialogRef.afterClosed().pipe(
      switchMap((result: Meal) => {
        if (result) {
          result.plannedDates.push(dateToPlanMeal);
          return this.mealService.updateMeal(result);
        }
        return EMPTY;
      })
    ).subscribe(() => {
      this.matSnackBar.open('Dodano obiad do planu posiłków!', 'Ok', { duration: 2000 });
    });
  }

  openDeleteFromMealPlanDialog(dateToDelete: Date): void {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Czy na pewno chcesz usunąć ten obiad z planu posiłków?'
      }
    });

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (result) {
        this.currentMeal.plannedDates = this.currentMeal.plannedDates.filter(date => !moment(date).isSame(dateToDelete, 'day'));
        return this.mealService.updateMeal(this.currentMeal);
      }
      return EMPTY;
    })).subscribe(() => {
      this.matSnackBar.open('Usunięto obiad z planu posiłków!', 'Ok', { duration: 2000 });
    });
  }
}
