import { TestBed } from "@angular/core/testing";
import { ClothesStack, DishTowelStack, IndexedLocation, LocationEnum, TowelStack } from "./Locations";

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

            it('should create an instance with the location defaulted to WhiteGreenDishTowelStack', () => {
                
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
    });
});