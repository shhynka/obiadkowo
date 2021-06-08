import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';
import { DeleteMealDialogComponent } from '../delete-meal-dialog/delete-meal-dialog.component';

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
    let dialogRef = this.matDialog.open(DeleteMealDialogComponent);

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (result) {
        return this.mealService.deleteMeal(this.meal.id);
      }
      return EMPTY;
    })).subscribe();
  }

  addToMealPlan(date: FormControl) {
    if (date.value) {
      let pickedDate = new Date(date.value);
      console.log("data: ", pickedDate);
      this.meal.plannedDates.push(pickedDate);

      console.log("pickeddate: ", pickedDate);
      console.log("meal: ", this.meal);
      this.mealService.updateMeal(this.meal).subscribe();
      this.matSnackBar.open("Zaplanowano obiad!", "Hide", { duration: 2000 });
    }
  }
}

