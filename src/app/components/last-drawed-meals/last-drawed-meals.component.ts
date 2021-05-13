import { Component, Input, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal.model';
import { MealService } from 'src/app/services/meal.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-last-drawed-meals',
  templateUrl: './last-drawed-meals.component.html',
  styleUrls: ['./last-drawed-meals.component.scss']
})
export class LastDrawedMealsComponent implements OnInit {

  lastDrawedMeals: Observable<Meal[]>;
  @Input() data: any[] = [];

  constructor(private mealService: MealService) { }

  ngOnInit(): void {
    this.lastDrawedMeals = this.mealService.getMealList().pipe(map(meals => {
      return meals.sort((m1, m2) => {
        if (m1.lastDrawDate < m2.lastDrawDate) {
          return 1;
        }
        if (m1.lastDrawDate > m2.lastDrawDate) {
          return -1;
        }
        return 0;
      }).slice(0, 7);
    }));

    this.lastDrawedMeals.subscribe(data => {
      console.log(data);
      this.data.push(this.lastDrawedMeals);
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }
}
