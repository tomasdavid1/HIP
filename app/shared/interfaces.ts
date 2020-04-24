export interface ICustomer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: IState;
    zip: number;
    gender: string;
    latitude: number;
    longitude: number;
    orderCount?: number;
    ordersTotal?: number;
}

export interface ICountry {
    id: number;
    name: string;
    GDP: number;
    GPDPerCapita: number;
    giniIndex: number;
    PPPIndex: number;
    // Maybe add array of Interfaces field later
}


export interface IState {
    abbreviation: string;
    name: string;
}

