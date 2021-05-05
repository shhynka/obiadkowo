import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileHandle } from 'src/app/models/fileHandle.model';
import { MealService } from 'src/app/services/meal.service';
import { IngredientFormDialogComponent } from '../ingredient-form-dialog/ingredient-form-dialog.component';

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-meal.component.scss']
})
export class NewMealComponent implements OnInit {

  image: FileHandle;
  form: FormGroup;

  ingredientsList = [];

  constructor(private matDialog: MatDialog, private mealService: MealService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*')]),
      imageUrl: new FormControl('', [Validators.required]),
      recipe: new FormControl('')
    });

    this.form.valueChanges.subscribe((v) => console.log)
    this.form.statusChanges.subscribe((v) => console.log)
  }

  get name(): AbstractControl {
    return this.form.controls.name;
  }

  get imageUrl() {
    return this.form.controls.imageUrl;
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
      const { name, recipe } = this.form.value;
      this.mealService
        .addMeal({ id: "", name, ingredients: this.ingredientsList, imageUrl: this.image.url.toString(), recipe })
        .subscribe((meal) => {
          if (meal) {
            this.matSnackBar.open("Dodano nowy obiad!", "Hide", { duration: 2000 })
          }
        })
    }
  }
}
