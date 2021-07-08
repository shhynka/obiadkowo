import { Injectable } from '@angular/core';
import { from, Observable, pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Meal } from '../models/meal.model';
import * as moment from 'moment';
import { PlannedMeal } from '../models/plannedMeal.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private mealsCollection: AngularFirestoreCollection<Meal>;
  meals: Observable<Meal[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.mealsCollection = this.angularFirestore.collection<Meal>("meals", ref => ref.where("userId", "==", firebase.auth().currentUser.uid));

    this.meals = this.mealsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Meal;
        const id = a.payload.doc.id;
        const plannedDates = (data.plannedDates as any[]).map((date: Timestamp) => date.toDate());
        return { ...data, plannedDates, id };
      }))
    )
  }

  getMeal(id: string) {
    return this.mealsCollection
      .doc(id)
      .valueChanges();
  }

  addMeal(newMeal: Meal) {
    return from(this.mealsCollection.add({ ...newMeal, userId: firebase.auth().currentUser.uid }))
      .pipe(map(doc => !!doc.id));
  }

  updateMeal(mealToUpdate: Meal) {
    return from(this.mealsCollection
      .doc(mealToUpdate.id)
      .update({
        name: mealToUpdate.name,
        ingredients: mealToUpdate.ingredients,
        imageUrl: mealToUpdate.imageUrl,
        imagePath: mealToUpdate.imagePath,
        recipe: mealToUpdate.recipe,
        plannedDates: mealToUpdate.plannedDates
      }))
  }

  deleteMeal(id: string) {
    return from(this.mealsCollection
      .doc(id)
      .delete());
  }

  getMealPlan(): Observable<PlannedMeal[]> {
    return this.meals.pipe(
      map(meals => {
        let filteredMealList = meals.filter(meal =>
          meal.plannedDates.some(plannedDate => {
            const currentDate = moment();
            const planD = moment(plannedDate);
            const dayDifference = planD.diff(currentDate, "days");
            return 0 <= dayDifference && dayDifference <= 7
          })
        );
        let dateList: moment.Moment[] = [];
        dateList.push(moment());

        for (let i = 1; i < 7; i++) {
          dateList.push(moment().add(i, "days"));
        }

        return dateList.map(date => {
          let foundMeals = filteredMealList.filter(meal => meal.plannedDates.some(plannedDate => moment(plannedDate).isSame(date, "day")));
          return { date: date.toDate(), meals: foundMeals }
        });
      }
      ));
  }

  getRandomMeal() {
    return this.meals.pipe(take(1), map(meals => {
      let randomIndex = Math.floor(Math.random() * meals.length);
      return meals[randomIndex];
    }));
  }
}

