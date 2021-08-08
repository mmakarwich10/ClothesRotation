export abstract class ClothesItem {
    protected _id: number;
    protected _type: ClothesType;
    protected _description: string;
    protected _dateMoved: Date;

    constructor(
        id: number,
        type: ClothesType,
        description: string,
        dateMoved: Date
    ) {
        this._id = id;
        this._type = type;
        this._description = description;
        this._dateMoved = dateMoved;
    }
}

export abstract class Towel extends ClothesItem {    
    constructor(
        id: number,
        description: string,
        dateMoved: Date
    ) {
        super(id, ClothesType.Towel, description, dateMoved);
    }
}

export abstract class Underwear extends ClothesItem {    
    constructor(
        id: number,
        description: string,
        dateMoved: Date
    ) {
        super(id, ClothesType.Underwear, description, dateMoved);
    }
}

export class DishTowel extends Towel {
    constructor(
        id: number,
        description: string,
        dateMoved: Date
    ) {
        super(id, description, dateMoved);
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