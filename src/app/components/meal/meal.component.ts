import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss']
})
export class MealComponent implements OnInit {

  @Input() layoutType: 'list' | 'gallery';
  @Input() meal: Meal;
  date: FormControl;

  constructor(private matDialog: MatDialog, private mealService: MealService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.date = new FormControl("", Validators.required);
  }

  openDeleteDialog() {
    let dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      data: { message: "Czy na pewno chcesz usunąć ten obiad?" }
    });

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (result) {
        return this.mealService.deleteMeal(this.meal.id);
      }
      return EMPTY;
    })).subscribe(() => {
      this.matSnackBar.open("Usunięto obiad!", "Ok", { duration: 2000 });
    }
    );
  }

  addToMealPlan(date: FormControl) {
    if (date.value) {
      this.meal.plannedDates.push(date.value);
      this.mealService.updateMeal(this.meal).subscribe(() => {
        this.matSnackBar.open("Zaplanowano obiad!", "Ok", { duration: 2000 });
      });
    }
  }
}

