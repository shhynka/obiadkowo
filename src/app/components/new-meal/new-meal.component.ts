import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FileHandle } from 'src/app/models/fileHandle.model';

@Component({
  selector: 'app-new-meal',
  templateUrl: './new-meal.component.html',
  styleUrls: ['./new-meal.component.scss']
})
export class NewMealComponent implements OnInit {

  image: FileHandle;

  ingredients = [
    'coś',
    'coś 2',
    'coś 3'
  ];

  constructor() { }

  ngOnInit(): void {
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

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.ingredients, event.previousIndex, event.currentIndex);
  }
}
