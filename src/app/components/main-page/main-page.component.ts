import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';
import { MatDialog } from '@angular/material/dialog';
import { DrawDialogComponent } from '../draw-dialog/draw-dialog.component';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  plannedMeals: { date: Date, meal: Meal }[] = [];

  constructor(private mealService: MealService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.mealService.getMealPlan().subscribe((meals) => {
      this.plannedMeals = meals;
    })
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
}

