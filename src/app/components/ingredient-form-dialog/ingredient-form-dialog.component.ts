import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ingredient-form-dialog',
  templateUrl: './ingredient-form-dialog.component.html',
  styleUrls: ['./ingredient-form-dialog.component.scss']
})
export class IngredientFormDialogComponent implements OnInit {

  ingredientControl: FormControl;

  constructor(private matDialogRef: MatDialogRef<IngredientFormDialogComponent>, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.ingredientControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ ]*')]);
  }

  saveIngredient() {
    if (this.ingredientControl.valid) {
      this.matDialogRef.close(this.ingredientControl.value);
      this.matSnackBar.open("Dodano składnik obiadu!", "Hide", { duration: 2000 });
    }
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
