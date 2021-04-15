import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { Meal } from 'src/app/models/meal.model';
import { sortByDropdownValue } from 'src/app/models/sortByDropdownValue.model';
import { sortByOption } from 'src/app/models/sortByOption.model';
import { MealService } from 'src/app/services/meal.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss']
})
export class MealListComponent implements OnInit {

  meals: Observable<Meal[]>;
  sortBy: BehaviorSubject<sortByOption> = new BehaviorSubject({ propertyName: "name", direction: "asc" });
  sortByDropdownValues: sortByDropdownValue[] = [
    { sortByOption: { propertyName: "name", direction: "asc" }, displayValue: "Alfabetycznie rosnąco" },
    { sortByOption: { propertyName: "name", direction: "desc" }, displayValue: "Alfabetycznie malejąco" },
    { sortByOption: { propertyName: "lastDrawDate", direction: "asc" }, displayValue: "Data wylosowania rosnąco" },
    { sortByOption: { propertyName: "lastDrawDate", direction: "desc" }, displayValue: "Data wylosowania malejąco" }
  ];
  sortByOptionControl: FormControl = new FormControl();

  constructor(private mealService: MealService) { }

  ngOnInit(): void {
    const mealList = this.mealService.getMealList();
    this.sortByOptionControl.setValue(this.sortByDropdownValues[0].sortByOption);

    this.meals = combineLatest([this.sortByOptionControl.valueChanges.pipe(startWith(this.sortByDropdownValues[0])), mealList]).pipe(
      map(([currentSortBy, currentMealList]) => {
        return currentMealList.sort((m1, m2) => {
          if (m1[currentSortBy.propertyName] > m2[currentSortBy.propertyName]) {
            return currentSortBy.direction == "asc" ? 1 : -1;
          }
          if (m1[currentSortBy.propertyName] < m2[currentSortBy.propertyName]) {
            return currentSortBy.direction == "asc" ? -1 : 1;
          }
          return 0;
        })
      }))
  }


}
