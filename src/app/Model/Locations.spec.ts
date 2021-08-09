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

        describe('methods ->', () => {
            let testItem : DishTowel;

            describe('push() ->', () => {
                
                
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
                        let testItem2 = new DishTowel(1, 'test2', new Date("8/8/21"));

                        testInstance.push(testItem2);

                        expect(testInstance.items[1]).toEqual(testItem2);
                    });
                }); 
                
                it('should not add the new item to the stack', () => {
                    //testItem = new 
                });
            });

            describe('pop() ->', () => {
                beforeEach(() => {
                    testInstance.push(testItem);
                });

                it('should remove item from the stack', () => {
                    testInstance.pop();

                    expect(testInstance.items.length).toEqual(0);
                });

                it('should remove item from the end of the stack', () => {
                    let testItem2 = new DishTowel(1, 'test2', new Date("8/8/21"));

                    testInstance.push(testItem2);

                    testInstance.pop();

                    expect(testInstance.items[0]).not.toEqual(testItem2);
                })
            });

            describe('remove()/removeAt() ->', () => {
                beforeEach(() => {
                    testItem = new DishTowel(3, 'test3', new Date("8/9/21"));
                    testInstance.push(new DishTowel(0, 'test', new Date("8/8/21")));
                    testInstance.push(testItem);
                    testInstance.push(new DishTowel(1, 'test2', new Date("8/8/21")));
                })

                it('should remove the second item from the list', () => {
                    testInstance.removeAt(1);

                    expect(testInstance.items[1]).not.toEqual(testItem);
                });

                it('should remove item from the list', () => {
                    testInstance.remove(testItem);

                    expect(testInstance.items.length).not.toContain(testItem);
                });
            });            
        });

        it('should throw an error when trying to set loc', () => {
            expect(() => {testInstance.loc = LocationEnum.Standby;}).toThrowError();
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