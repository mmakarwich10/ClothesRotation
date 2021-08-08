import { ClothesItem, ClothesType, DishTowel, Towel, Underwear } from './Clothes';

export interface ClothesLocation {
    readonly loc: LocationEnum; 
    remove(item: ClothesItem): void;
}

export interface IndexedLocation extends ClothesLocation {
    readonly items: Array<ClothesItem>;
    push(newItem: ClothesItem): void;
    pop(): void;
    remove(item: ClothesItem, index?: number): void;
}

export interface TowelLocation extends ClothesLocation {}

export interface UnderwearLocation extends ClothesLocation {}

export class LocationHelper {
    constructor() {}

    static getAcceptedLocations(type: LocationHelperEnum): LocationEnum[] {
        var returnList: LocationEnum[] = [
            LocationEnum.AltUnderwearStack,
            LocationEnum.HanesMainStack,
            LocationEnum.HangingPantsQueue,
            LocationEnum.OnRack,
            LocationEnum.Standby,
            LocationEnum.StoolStack,
            LocationEnum.Wearing,
            LocationEnum.WhiteGreenDishTowelStack
        ];
        
        switch(type) {
            case LocationHelperEnum.All:
                break;
            default:
                returnList = [];
                break;
        }

        return returnList;
    }
}

export abstract class ClothesStack implements IndexedLocation {
    loc: LocationEnum;
    items: Array<ClothesItem>;

    constructor(location: LocationEnum) {
        this.loc = location;
        this.items = [];
    }

    push(newItem: ClothesItem): void {
        this.items.push(newItem);
        newItem.moveTo(this);
    }

    pop(): void {
        this.items.pop();
    }

    remove(item?: ClothesItem, index?: number): void {
        const _index: number = item ? this.items.findIndex(x => x === item) : index ?? -1;
        if (_index > -1) {
            this.items.splice(_index, 1);
        }
    }
}

abstract class ClothesQueue implements IndexedLocation {
    loc: LocationEnum;
    items: Array<ClothesItem>;

    constructor(location: LocationEnum) {
        this.loc = location;
        this.items = [];
    }

    push(newItem: ClothesItem): void {
        this.items.push(newItem);
        newItem.moveTo(this);
    }

    pop(): void {
        this.items.splice(0, 1);
    }

    remove(item?: ClothesItem, index?: number): void {
        const _index: number = item ? this.items.findIndex(x => x === item) : index ?? -1;
        if (_index > -1) {
            this.items.splice(_index, 1);
        }
    }
}
  
export abstract class TowelStack extends ClothesStack implements TowelLocation {
    constructor(location: LocationEnum) {
        super(location);
    }

    push(newItem: Towel): void {
        super.push(newItem);
    } 

    remove(item?: Towel, index?: number): void {
        super.remove(item, index);
    }
}

export class DishTowelStack extends TowelStack {
    constructor(location: LocationEnum) {
        super(location);
    }

    push(newItem: DishTowel): void {
        super.push(newItem);
    }

    remove(item?: DishTowel, index?: number): void {
        super.remove(item, index);
    }
}

class UnderwearStack extends ClothesStack implements UnderwearLocation {
    constructor(location: LocationEnum) {
        super(location);
    }

    push(newItem: Underwear): void {
        super.push(newItem);
    }
}

export enum LocationHelperEnum {
    All
}

export enum LocationEnum {
    AltUnderwearStack, // needs locationSubIndex, only for Underwear
    HanesMainStack, // needs locationSubIndex, only for Underwear
    HangingPantsQueue, // needs locationSubIndex, only for Pants
    OnRack, // Towels and Masks only
    Standby, 
    StoolStack, // needs locationSubIndex, only for Shirts
    Wearing, // used for all except Towel
    WhiteGreenDishTowelStack // needs locationSubIndex, only for DishTowels
}