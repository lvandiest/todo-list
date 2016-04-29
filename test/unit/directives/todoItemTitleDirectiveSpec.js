/* global describe, beforeEach, module, it, expect, inject */
'use strict';

describe('Given the todo-item-title directive', function () {

    var element, $scope, controller, updateItemMock;
    
    updateItemMock = jasmine.createSpy();

    beforeEach(function () {
        
        module('todoApp', function($provide) {
            $provide.factory('todoService', function() {
                return {
                    updateItem: updateItemMock
                }
            });
        });
        
        inject(function ($rootScope, $compile) {
            $scope = $rootScope;
            $scope.attrs = {
                title: 'Stuff to do',
                index: 3
            }
            
            element = angular.element('<i todo-item-title title="attrs.title" index="attrs.index"></i>');
            
            $compile(element)($scope);
            $scope.$digest();
            
            controller = element.controller('todoItemTitle');
            
        });
    });

    describe('Rendering', function() {
            
        it('Should replace the element the directive is placed on', function() {

            expect(element.is('div')).toBeTruthy();
            expect(element.hasClass('todo-item-title')).toBeTruthy();

        });
            
    });
    
    describe('The controller', function() {
        
        it('Should set the correct state when the directive is initiated', function() {
            
            expect(controller.state).toEqual({
                VIEW: 1,
                EDIT: 2,
                status: 1
            });
            
        });
        
        it('Should save the attributes \'title\' and \'index\' in the controller, and convert \'index\' to an integer', function() {
            
            expect(controller.title).toBe('Stuff to do');
            expect(controller.index).toBe(3);
            
        });
        
        describe('The cancel function', function() {
            
            it('should set state back to VIEW', function() {
                
                controller.state.status = controller.state.EDIT;
                
                controller.cancel();
                
                expect(controller.state.status).toBe(controller.state.VIEW);
                
            });
            
        });
        
        describe('The edit function', function() {
            
            it('Should set state to EDIT and save the current value of the \'title\' attribute as newValue', function() {
                
                controller.edit();
                
                expect(controller.state.status).toBe(controller.state.EDIT);
                expect(controller.newValue).toBe(controller.title);
                
            });
            
        });
        
        describe('The save function', function() {
            
            it('Should update controller.title with the value of controller.newValue, call updateItem in the todoService with the index and the changed value and set state back to VIEW', function() {
                
                controller.newValue = 'New item title';
                controller.state.status = controller.state.EDIT;
                expect(controller.value).not.toEqual(controller.newValue);
                
                controller.save();
                
                expect(controller.title).toEqual(controller.newValue);
                expect(controller.state.status).toBe(controller.state.VIEW);
                expect(updateItemMock).toHaveBeenCalledWith(controller.index, controller.newValue);
                
            });
            
        });
        
    });

});