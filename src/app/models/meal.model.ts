export interface Meal {
    id?: string;
    name: string;
    userId?: string;
    ingredients?: string[];
    imageUrl: string;
    imagePath: string;
    recipe?: string;
    plannedDates?: Date[];
}
