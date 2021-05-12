import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FileHandle } from 'src/app/models/fileHandle.model';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';
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

  constructor(private activatedRoute: ActivatedRoute, private matDialog: MatDialog, private mealService: MealService, private matSnackBar: MatSnackBar) { }

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
      }
    });
  }

  saveMeal() {
    if (this.form.valid) {
      const id = this.activatedRoute.snapshot.params.id;
      console.log(this.meal);

      if (this.id) {
        console.log(this.form.valid);

        const { name, recipe } = this.form.value;
        this.mealService.updateMeal({
          id: this.meal.id,
          name,
          ingredients: this.ingredientsList,
          imageUrl: this.image.url.toString(),
          recipe,
        }).subscribe((meal) => {
          if (meal) {
            this.matSnackBar.open("Zaktualizowano obiad!", "Hide", { duration: 2000 })
          }
        })
      } else {
        const { name, recipe } = this.form.value;

        this.mealService
          .addMeal({
            id: "",
            name,
            ingredients: this.ingredientsList,
            imageUrl: this.image.url.toString(),
            recipe
          })
          .subscribe((meal) => {
            if (meal) {
              this.matSnackBar.open("Dodano nowy obiad!", "Hide", { duration: 2000 })
            }
          })
      }
    }
  }

}