export interface IListEntry {
    id: string;
    name: string;
    url: string;
}

export interface ITableEntry {
    id: string;
    name: string;
    caught: boolean;
}

export interface ILocation {
    location_area: {
        name: string
    }
}