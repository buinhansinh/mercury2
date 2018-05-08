export interface Location {
    id: string;
    name: string;
}

export interface Stock {
    location_id: string;
    location_name: string;
    quantity: number;
}
