export interface Meal {
    id: string;
    name: string;
    ingredients?: string[];
    imageUrl?: string;
    imagePath?: string;
    recipe?: string;
    plannedDates?: Date[];
}
