import { ClothesItem, DishTowel, Towel } from "./Clothes"

describe('Towel ->', () => {
    describe('DishTowel ->', () => {
        var testInstance : DishTowel;
        
        beforeEach(() => {
            testInstance = new DishTowel(0, 'test', new Date("8/8/21"));
        });

        describe('constructor ->', () => {
            it('should create an instance of the class', () => {
                expect(testInstance).toBeTruthy();
            });
            
            describe('ClothesItem ->', () => {
                it('should set the ID to zero', () => {
                    //expect(testInstance.id)
                });
            });
        });

        describe('Inheritance And Type Checks ->', () => {
            it('should create an object that is an instance of TowelStack', () => {
                expect(testInstance).toBeInstanceOf(Towel);
            });

            it('should create an object that is an instance of ClothesStack', () => {
                expect(testInstance).toBeInstanceOf(ClothesItem);
            });
        })
    });
});