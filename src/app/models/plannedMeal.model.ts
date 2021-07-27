import { Meal } from './meal.model';

export interface PlannedMeal {
    date: Date;
    meals: Meal[];
    isDrawPossible: boolean;
}
