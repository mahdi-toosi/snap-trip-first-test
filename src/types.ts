export interface Flight {
    airline: string;
    price: number;
    flightTime: string;
}

export interface Filters {
    maxPrice: number;
    airlines: string[];
    flightTime: { min: number; max: number };
    flightTimeLabel: "dawn" | "morning" | "noon" | "night";
}
