import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-meal-dialog',
  templateUrl: './delete-meal-dialog.component.html',
  styleUrls: ['./delete-meal-dialog.component.scss']
})
export class DeleteMealDialogComponent implements OnInit {

  result: boolean;

  constructor(private matDialogRef: MatDialogRef<DeleteMealDialogComponent>, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  deleteMeal() {
    this.result = true;
    this.matDialogRef.close(this.result);
    this.matSnackBar.open("Usunięto obiad!", "Hide", { duration: 2000 });
  }

  closeDialog() {
    this.matDialogRef.close();
  }
}
