import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private matDialog: MatDialog, private mealService: MealService) { }

  ngOnInit(): void {
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
}

