import { TestBed } from "@angular/core/testing";
import { ClothesItem, DishTowel, Towel } from "./Clothes";
import { ClothesStack, DishTowelStack, IndexedLocation, LocationEnum, LocationHelper, LocationHelperEnum, TowelStack } from "./Locations";

describe('ClothesStack ->', () => {
    describe('DishTowelStack ->', () => {
        var testInstance: DishTowelStack;
    
        beforeEach(() => {
            testInstance = new DishTowelStack(LocationEnum.WhiteGreenDishTowelStack);
        });

        describe('constructor ->', () => {
            it('should create an instance of the class', () => {
                expect(testInstance).toBeTruthy();
            });  
            
            describe('ClothesStack ->', () => {
                it('should create an instance with a location of WhiteGreenDishTowelStack', () => {
                    expect(testInstance.loc).toEqual(LocationEnum.WhiteGreenDishTowelStack);
                });

                it('should create an instance with an initialized items array', () => {
                    expect(testInstance.items).toBeTruthy();
                });
    
                it('should create an instance with an empty items array', () => {
                    expect(testInstance.items.length).toEqual(0);
                });
            });

            it('should create an instance with the location defaulted to Standby', () => {
                testInstance = new DishTowelStack(LocationEnum.AltUnderwearStack);
                expect(testInstance.loc).toEqual(LocationEnum.Standby);
            });
        });
        
        describe('Inheritance And Type Checks ->', () => {
            it('should create an object that is an instance of TowelStack', () => {
                expect(testInstance).toBeInstanceOf(TowelStack);
            });

            it('should create an object that is an instance of ClothesStack', () => {
                expect(testInstance).toBeInstanceOf(ClothesStack);
            });

            it('should create an object that is of type IndexedLocation', () => {
                expect("items" in testInstance).toBeTrue();
            });

            it('should create an object that is of type ClothesLocation', () => {
                expect("loc" in testInstance).toBeTrue();
            });
        });

        describe('push() ->', () => {
            let testItem : DishTowel;
            
            describe('Preliminary checks ->', () => {
                beforeEach(() => {
                    testItem = new DishTowel(0, 'test', new Date("8/8/21"));
    
                    testInstance.push(testItem);
                });
                
                it('should add the new item to the stack', () => {
                    expect(testInstance.items.length).toEqual(1);
                    expect(testInstance.items[0]).toEqual(testItem);
                });
    
                it('should add the new item that is an instance of Towel to the stack', () => {
                    expect(testInstance.items[0]).toBeInstanceOf(Towel);
                });
    
                it('should add the new item that is an instance of DishTowel to the stack', () => {
                    expect(testInstance.items[0]).toBeInstanceOf(DishTowel);
                });

                it('should add the new item to the end of the stack', () => {
                    testInstance.push(new DishTowel(1, 'test2', new Date("8/8/21")));
                });
            }); 
            
            it('should not add the new item to the stack', () => {
                //testItem = new 
            });

            
        });
    });
});

describe('LocationHelper ->', () => {
    it('should not return an empty list for type Towel', () => {
        var testList = LocationHelper.getAcceptedLocations(LocationHelperEnum.Towel);

        expect(testList.length).toBeGreaterThan(0);
    });

    it('should not return an empty list for type DishTowel', () => {
        var testList = LocationHelper.getAcceptedLocations(LocationHelperEnum.DishTowel);

        expect(testList.length).toBeGreaterThan(0);
    });
});