import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal.model';
import { LastDrawedMealsService } from 'src/app/services/last-drawed-meals.service';
import * as moment from 'moment';

@Component({
  selector: 'app-last-drawed-meals',
  templateUrl: './last-drawed-meals.component.html',
  styleUrls: ['./last-drawed-meals.component.scss']
})
export class LastDrawedMealsComponent implements OnInit {

  lastMeals: Meal[];

  constructor(private lastDrawedMealsService: LastDrawedMealsService) { }

  ngOnInit(): void {
    this.lastMeals = this.lastDrawedMealsService.meals;
  }

  getTimeAgoFromNow(date: Date) {
    return moment(date).fromNow();
  }
}
