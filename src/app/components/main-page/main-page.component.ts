import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  data: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  drawedMeals = [
    '1',
    '2',
    '3',
    '',
    '',
    '',
    ''
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.drawedMeals, event.previousIndex, event.currentIndex);
  }

}
