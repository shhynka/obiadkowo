import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Meal } from '../models/meal.model';
import * as moment from 'moment';
import { PlannedMeal } from '../models/plannedMeal.model';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

@Injectable({
  providedIn: 'root'
})
export class MealService {

  meals: Observable<Meal[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.meals = this.getMealList();
  }

  getMeal(id: string): Observable<Meal> {
    return this.angularFirestore.collection<Meal>('meals', ref => ref.where('userId', '==', firebase.auth().currentUser.uid))
      .doc(id)
      .valueChanges();
  }

  getMealList(): Observable<Meal[]> {
    return this.angularFirestore.collection<Meal>('meals', ref => ref.where('userId', '==', firebase.auth().currentUser.uid))
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          const plannedDates = (data.plannedDates as any[]).map((date: Timestamp) => date.toDate());
          return { ...data, plannedDates, id };
        })));
  }

  addMeal(newMeal: Meal): Observable<boolean> {
    return from(this.angularFirestore.collection<Meal>('meals', ref => ref.where('userId', '==', firebase.auth().currentUser.uid))
      .add({ ...newMeal, userId: firebase.auth().currentUser.uid }))
      .pipe(map(doc => !!doc.id));
  }

  updateMeal(mealToUpdate: Meal): Observable<void> {
    return from(this.angularFirestore.collection<Meal>('meals', ref => ref.where('userId', '==', firebase.auth().currentUser.uid))
      .doc(mealToUpdate.id)
      .update({
        name: mealToUpdate.name,
        ingredients: mealToUpdate.ingredients,
        imageUrl: mealToUpdate.imageUrl,
        imagePath: mealToUpdate.imagePath,
        recipe: mealToUpdate.recipe,
        plannedDates: mealToUpdate.plannedDates
      }));
  }

  deleteMeal(id: string): Observable<void> {
    return from(this.angularFirestore.collection<Meal>('meals', ref => ref.where('userId', '==', firebase.auth().currentUser.uid))
      .doc(id)
      .delete());
  }

  getMealPlan(): Observable<PlannedMeal[]> {
    return this.meals.pipe(
      map(meals => {
        const filteredMealList = meals.filter(meal =>
          meal.plannedDates.some(plannedDate => {
            const currentDate = moment();
            const planD = moment(plannedDate);
            const dayDifference = planD.diff(currentDate, 'days');
            return 0 <= dayDifference && dayDifference <= 7;
          })
        );
        const dateList: moment.Moment[] = [];
        dateList.push(moment());

        for (let i = 1; i < 7; i++) {
          dateList.push(moment().add(i, 'days'));
        }

        return dateList.map(date => {
          const foundMeals = filteredMealList.filter(meal =>
            meal.plannedDates.some(plannedDate => moment(plannedDate).isSame(date, 'day')));
          return { date: date.toDate(), meals: foundMeals, isDrawPossible: meals.length !== foundMeals.length };
        });
      }
      ));
  }

  getRandomMeal(excludedDate: Date): Observable<Meal> {
    return this.meals.pipe(take(1), map(meals => {
      const filteredMealList = meals.filter(meal => !meal.plannedDates.some(date => moment(date).isSame(excludedDate, 'day')));
      const randomIndex = Math.floor(Math.random() * filteredMealList.length);
      return filteredMealList[randomIndex];
    }));
  }
}

