import { ClothesLocation, LocationEnum, LocationHelper, LocationHelperEnum, TowelLocation, UnderwearLocation } from "./Locations";

export abstract class ClothesItem {
    protected _id: number;
    protected _type: ClothesType;
    protected _description: string;
    protected _location: LocationEnum;
    protected _dateMoved: Date;
    protected _acceptableLocations: LocationEnum[];

    constructor(
        id: number,
        type: ClothesType,
        description: string,
        location: LocationEnum,
        dateMoved: Date
    ) {
        this._id = id;
        this._type = type;
        this._description = description;
        this._dateMoved = dateMoved;
        this._acceptableLocations = LocationHelper.getAcceptedLocations(LocationHelperEnum.All);
        this._location = location in this._acceptableLocations ? location : LocationEnum.Standby;
    }

    moveTo(newLocation: LocationEnum): void {
        this._location = newLocation in this._acceptableLocations ? newLocation : LocationEnum.Standby;
    }
}

export abstract class Towel extends ClothesItem {    
    constructor(
        id: number,
        description: string,
        location: LocationEnum,
        dateMoved: Date
    ) {
        super(id, ClothesType.Towel, description, location, dateMoved);
    }
}

export abstract class Underwear extends ClothesItem {    
    constructor(
        id: number,
        description: string,
        location: LocationEnum,
        dateMoved: Date
    ) {
        super(id, ClothesType.Underwear, description, location, dateMoved);
    }
}

export class DishTowel extends Towel {
    constructor(
        id: number,
        description: string,
        location: LocationEnum,
        dateMoved: Date
    ) {
        super(id, description, location, dateMoved);
    }
}

export enum ClothesType {
    Mask,
    Pants,
    Shirt,
    Sock,
    Towel,
    Underwear
}