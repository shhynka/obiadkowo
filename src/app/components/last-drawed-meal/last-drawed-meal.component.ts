import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Meal } from 'src/app/models/meal.model';

@Component({
  selector: 'app-last-drawed-meal',
  templateUrl: './last-drawed-meal.component.html',
  styleUrls: ['./last-drawed-meal.component.scss']
})
export class LastDrawedMealComponent implements OnInit {

  @Input() lastMeal: Meal;

  constructor() { }

  ngOnInit(): void {
  }

  getTimeAgoFromNow(date: Date) {
    return moment(date).fromNow();
  }

}
