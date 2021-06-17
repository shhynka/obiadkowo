import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FileHandle } from 'src/app/models/fileHandle.model';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { IngredientFormDialogComponent } from '../ingredient-form-dialog/ingredient-form-dialog.component';

@Component({
  selector: 'app-create-or-update-meal-form',
  templateUrl: './create-or-update-meal-form.component.html',
  styleUrls: ['./create-or-update-meal-form.component.scss']
})
export class CreateOrUpdateMealFormComponent implements OnInit {

  id: string;
  image: FileHandle;
  meal: Meal;
  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*')]),
    imageUrl: new FormControl(""),
    recipe: new FormControl("")
  });
  ingredientsList: string[] = [];

  constructor(private activatedRoute: ActivatedRoute, private matDialog: MatDialog, private mealService: MealService, private matSnackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;

    if (this.id) {
      this.mealService
        .getMeal(this.id)
        .subscribe((meal) => {
          this.meal = meal;

          this.form.patchValue({
            name: meal.name,
            recipe: meal.recipe
          });

          this.ingredientsList = meal.ingredients;
          this.image = { url: meal.imageUrl, file: null };
        })
    }
  }

  get name(): AbstractControl {
    return this.form.controls.name;
  }

  get imageUrl() {
    return this.form.controls.imageUrl;
  }

  get recipe() {
    return this.form.controls.recipe;
  }

  onFileDropped($event): void {
    this.prepareFilesList($event);
  }

  fileBrowseHandler(event): void {
    const img = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = e => {
      this.image = { url: reader.result, file: img };
    };
  }

  prepareFilesList(file: FileHandle): void {
    this.image = file;
  }

  deleteImage(): void {
    this.image = null;
  }

  dropIngredients(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.ingredientsList, event.previousIndex, event.currentIndex);
  }

  deleteIngredient(index: number) {
    this.ingredientsList.splice(index, 1);
  }

  openIngredientDialog() {
    const dialogRef = this.matDialog.open(IngredientFormDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ingredientsList.push(result);
        this.matSnackBar.open("Dodano składnik obiadu!", "Ok", { duration: 2000 });
      }
    });
  }

  saveMeal() {
    if (this.form.valid) {
      const id = this.activatedRoute.snapshot.params.id;

      if (this.id) {
        const { name, recipe } = this.form.value;

        this.mealService.updateMeal({
          id: this.meal.id,
          name,
          ingredients: this.ingredientsList,
          imageUrl: this.image?.url.toString(),
          recipe,
          plannedDates: []
        }).subscribe((meal) => {
          if (meal) {
            this.matSnackBar.open("Zaktualizowano obiad!", "Ok", { duration: 2000 });
            this.router.navigateByUrl("/meal-list");
          }
        })
      } else {
        const { name, recipe } = this.form.value;

        this.mealService
          .addMeal({
            id: "",
            name,
            ingredients: this.ingredientsList,
            imageUrl: this.image?.url.toString(),
            recipe,
            plannedDates: []
          })
          .subscribe((meal) => {
            if (meal) {
              this.matSnackBar.open("Dodano nowy obiad!", "Ok", { duration: 2000 });
              this.router.navigateByUrl("/meal-list");
            }
          })
      }
    }
  }

  backToMealList() {
    if (this.form.dirty) {
      let dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
        data: { message: "Czy na pewno chcesz powrócić do listy obiadów? Wprowadzone zmiany nie zostaną zapisane" }
      })

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigateByUrl("/meal-list");
        }
      });
    } else {
      this.router.navigateByUrl("/meal-list");
    }
  }

}
