import { ClothesItem, ClothesType, DishTowel, Towel, Underwear } from './Clothes';

export interface ClothesLocation {
    readonly loc: LocationEnum; 
    remove(item: ClothesItem): void;
}

export interface IndexedLocation extends ClothesLocation {
    readonly items: Array<ClothesItem>;
    push(newItem: ClothesItem): void;
    pop(): void;
    remove(item: ClothesItem): void;
    removeAt(index: number): void;
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
            case LocationHelperEnum.Towel:
                returnList = this.removeNonTowelLocations(returnList);
                break;
            case LocationHelperEnum.DishTowel:
                returnList = this.removeNonTowelLocations(returnList);
                returnList.splice(returnList.findIndex(x => x === LocationEnum.OnRack), 1);
                break;
            default:
                returnList = [];
                break;
        }

        return returnList;
    }

    private static removeNonTowelLocations(list : LocationEnum[]) {
        list.splice(list.findIndex(x => x === LocationEnum.AltUnderwearStack), 1);
        list.splice(list.findIndex(x => x === LocationEnum.HanesMainStack), 1);
        list.splice(list.findIndex(x => x === LocationEnum.HangingPantsQueue), 1);
        list.splice(list.findIndex(x => x === LocationEnum.StoolStack), 1);
        list.splice(list.findIndex(x => x === LocationEnum.Wearing), 1);
        return list;
    }
}

export abstract class ClothesStack implements IndexedLocation {
    readonly loc: LocationEnum;
    readonly items: Array<ClothesItem>;

    constructor(location: LocationEnum, locDetails: LocationHelperEnum) {
        let acceptedLocations: LocationEnum[] = LocationHelper.getAcceptedLocations(locDetails);
        if (!(acceptedLocations.includes(location))) {
            this.loc = LocationEnum.Standby;
        } else {
            this.loc = location;
        }   
        
        this.items = [];
    }

    push(newItem: ClothesItem): void {
        this.items.push(newItem);
    }

    pop(): void {
        this.items.pop();
    }

    remove(item: ClothesItem): void {
        const _index: number = item ? this.items.findIndex(x => x === item) : -1;
        this.removeAt(_index);
    }

    removeAt(index: number): void {
        const _index: number = index ?? -1;
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
    }

    pop(): void {
        this.items.splice(0, 1);
    }

    remove(item: ClothesItem): void {
        const _index: number = item ? this.items.findIndex(x => x === item) : -1;
        this.removeAt(_index);
    }

    removeAt(index: number): void {
        const _index: number = index ?? -1;
        if (_index > -1) {
            this.items.splice(_index, 1);
        }
    }
}
  
export abstract class TowelStack extends ClothesStack implements TowelLocation {
    constructor(location: LocationEnum, locDetails: LocationHelperEnum) {
        super(location, locDetails);
    }

    push(newItem: Towel): void {
        super.push(newItem);
    } 

    remove(item: Towel): void {
        super.remove(item);
    }
}

export class DishTowelStack extends TowelStack {
    constructor(location: LocationEnum) {
        super(location, LocationHelperEnum.DishTowel);        
    }

    push(newItem: DishTowel): void {
        super.push(newItem);
    }

    remove(item: DishTowel): void {
        super.remove(item);
    }
}

class UnderwearStack extends ClothesStack implements UnderwearLocation {
    constructor(location: LocationEnum) {
        super(location, LocationHelperEnum.All);
    }

    push(newItem: Underwear): void {
        super.push(newItem);
    }
}








export enum LocationHelperEnum {
    All,
    Towel,
    Underwear,
    DishTowel
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