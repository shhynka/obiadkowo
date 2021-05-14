import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FileHandle } from 'src/app/models/fileHandle.model';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';
import { DeleteMealDialogComponent } from '../delete-meal-dialog/delete-meal-dialog.component';

@Component({
  selector: 'app-meal-view',
  templateUrl: './meal-view.component.html',
  styleUrls: ['./meal-view.component.scss']
})
export class MealViewComponent implements OnInit {

  id: string;
  meal: Meal;
  ingredients: string[];
  image: FileHandle;

  constructor(private mealService: MealService, private activatedRoute: ActivatedRoute, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;

    this.mealService.getMeal(this.id).subscribe(meal => {
      this.meal = meal;
      this.ingredients = meal.ingredients;
      this.image = { url: meal.imageUrl, file: null };
    })
  }

  openDeleteDialog() {
    let dialogRef = this.matDialog.open(DeleteMealDialogComponent);

    dialogRef.afterClosed().pipe(switchMap(result => {
      if (result) {
        return this.mealService.deleteMeal(this.id);
      }
      return EMPTY;
    })).subscribe();
  }
}
