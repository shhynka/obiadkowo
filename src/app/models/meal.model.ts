export interface Meal {
    id: string;
    name: string;
    ingredients?: string[];
    imageUrl?: string;
    recipe?: string;
    lastDrawDate?: Date;
    plannedDates?: Date[];
}
