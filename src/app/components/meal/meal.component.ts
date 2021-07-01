import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Meal } from 'src/app/models/meal.model';
import { FireStorageService } from 'src/app/services/firestorage.service';
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
  minDate: Date;
  maxDate: Date;
  msg: string;

  constructor(private matDialog: MatDialog, private mealService: MealService, private matSnackBar: MatSnackBar, private firestorageService: FireStorageService) { }

  ngOnInit(): void {
    this.date = new FormControl("", Validators.required);
    this.meal.plannedDates = this.meal.plannedDates.sort();
    this.minDate = moment().toDate();
    this.maxDate = moment().add(7, "days").toDate();
  }

  openDeleteDialog() {
    let dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      data: { message: "Czy na pewno chcesz usunąć ten obiad?" }
    });

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (result) {
        if (this.meal.imagePath) {
          this.firestorageService.deleteFile(this.meal.imagePath);
        };
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

  getMessage(): string {
    let latestMealDate = new Date(this.meal.plannedDates[this.meal.plannedDates.length - 1]);
    if (latestMealDate < this.minDate) {
      return "Ostatnio ugotowano: ";
    }
    if (latestMealDate >= this.minDate) {
      return "Zaplanowano na: ";
    }
  }
}

