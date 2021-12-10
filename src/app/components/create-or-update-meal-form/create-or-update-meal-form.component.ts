import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { filter, finalize, switchMap } from 'rxjs/operators';
import { Meal } from 'src/app/models/meal.model';
import { FireStorageService } from 'src/app/services/firestorage.service';
import { MealService } from 'src/app/services/meal.service';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { IngredientFormDialogComponent } from '../dialogs/ingredient-form-dialog/ingredient-form-dialog.component';
import firebase from 'firebase/app';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-create-or-update-meal-form',
  templateUrl: './create-or-update-meal-form.component.html',
  styleUrls: ['./create-or-update-meal-form.component.scss']
})
export class CreateOrUpdateMealFormComponent implements OnInit, OnDestroy {

  id: string;
  user: User;
  imagePath: string;
  ingredientsList: string[] = [];
  meal: Meal;
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*'),
      this.noWhitespaceValidator
    ]),
    imageUrl: new FormControl(''),
    recipe: new FormControl('')
  });
  uploadPercent: Observable<number>;
  saved = false;
  isSaving = false;
  unsavedChanges = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog,
    private mealService: MealService,
    private matSnackBar: MatSnackBar,
    private router: Router,
    private firestorageService: FireStorageService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;

    if (this.id) {
      this.mealService
        .getMeal(this.id)
        .subscribe((meal: Meal) => {
          this.meal = meal;
          this.ingredientsList = meal.ingredients;
          this.imagePath = meal.imagePath;

          this.form.setValue({
            name: meal.name,
            recipe: meal.recipe,
            imageUrl: meal.imageUrl
          });
        });
    }
  }

  ngOnDestroy(): void {
    if (!this.saved && this.imagePath && (!this.id || this.imagePath !== this.meal.imagePath)) {
      this.firestorageService.deleteFile(this.imagePath);
    }
  }

  @HostListener('window:beforeunload')
  windowBeforeUnload(): void {
    if (this.imagePath && (!this.id || this.imagePath !== this.meal.imagePath)) {
      this.firestorageService.deleteFile(this.imagePath);
    }
  }

  get name(): AbstractControl {
    return this.form.controls.name;
  }

  get imageUrl(): string {
    return this.form.controls.imageUrl.value;
  }

  get recipe(): AbstractControl {
    return this.form.controls.recipe;
  }

  private noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }

  onImageDropped($event): void {
    this.uploadImage($event);
  }

  imageBrowseHandler(event): void {
    const img = event.target.files[0];
    this.uploadImage(img);
  }

  uploadImage(image: File): void {
    const imagePath = `/images/${new Date().getTime()}-${image.name}`;

    const result = this.firestorageService.uploadFile(image, imagePath);
    result.task.snapshotChanges().pipe(
      filter(task => task.state === firebase.storage.TaskState.SUCCESS),
      switchMap(task => from(task.ref.getDownloadURL()))
    ).subscribe((url) => {
      this.form.controls.imageUrl.setValue(url);
      this.imagePath = imagePath;
      this.uploadPercent = null;
    });
  }

  dropIngredients(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.ingredientsList, event.previousIndex, event.currentIndex);
  }

  deleteIngredient(index: number): void {
    this.ingredientsList.splice(index, 1);
    this.unsavedChanges = true;
  }

  openIngredientDialog(): void {
    const dialogRef = this.matDialog.open(IngredientFormDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ingredientsList.push(result);
        this.matSnackBar.open('Dodano składnik obiadu!', 'Ok', { duration: 2000 });
      }
    });
  }

  saveMeal(): void {
    if (this.form.valid) {
      this.isSaving = true;
      if (this.id) {
        this.mealService
          .updateMeal({
            id: this.id,
            name: this.form.controls.name.value,
            ingredients: this.ingredientsList,
            imageUrl: this.form.controls.imageUrl.value,
            imagePath: this.imagePath || null,
            recipe: this.form.controls.recipe.value,
            plannedDates: []
          })
          .pipe(finalize(() => this.isSaving = false))
          .subscribe(
            () => {
              this.saved = true;
              if (this.imagePath && (this.meal.imagePath !== this.imagePath)) {
                this.firestorageService.deleteFile(this.meal.imagePath);
              }
              this.matSnackBar.open('Zaktualizowano obiad!', 'Ok', { duration: 2000 });
              this.router.navigateByUrl('/meal-list');
            },
            (error) => console.log('updating meal errored: ', error)
          );
      } else {
        this.mealService
          .addMeal({
            name: this.form.controls.name.value,
            ingredients: this.ingredientsList,
            imageUrl: this.form.controls.imageUrl.value,
            imagePath: this.imagePath || null,
            recipe: this.form.controls.recipe.value,
            plannedDates: []
          })
          .pipe(finalize(() => this.isSaving = false))
          .subscribe(
            () => {
              this.saved = true;
              this.matSnackBar.open('Dodano nowy obiad!', 'Ok', { duration: 2000 });
              this.router.navigateByUrl('/meal-list');
            },
            (error) => console.log('adding meal errored: ', error)
          );
      }
    }
  }

  backToMealList(): void {
    if (this.form.dirty || this.unsavedChanges) {
      const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
        data: { message: 'Czy na pewno chcesz powrócić do listy obiadów? Wprowadzone zmiany nie zostaną zapisane' }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.router.navigateByUrl('/meal-list');
        }
      });
    } else {
      this.router.navigateByUrl('/meal-list');
    }
  }



  deleteImage(): void {
    if (!this.id) {
      this.firestorageService.deleteFile(this.imagePath);
      this.form.controls.imageUrl.setValue(null);
      this.imagePath = null;
    } else {
      if (this.imagePath && (this.meal.imagePath !== this.imagePath)) {
        this.firestorageService.deleteFile(this.imagePath);
      }
      this.form.controls.imageUrl.setValue(null);
      this.imagePath = null;
      this.unsavedChanges = true;
    }
  }

}
