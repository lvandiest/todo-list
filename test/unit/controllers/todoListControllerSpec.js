/* global describe, beforeEach, module, it, expect, inject, jasmine */
'use strict';

describe('Given the todo list controller', function () {

    var $rootScope, $scope, createController, controller, todoServiceMock, getDataMock, addItemMock, deleteItemMock, updateItemMock, toggleDoneMock, removeDoneItemsMock, todoData;

    beforeEach(module('todoApp'));

    beforeEach(inject(function ($injector) {

        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();

        var $controller = $injector.get('$controller');

        todoData = [
            {title: 'Item 1', done: false},
            {title: 'Item 2', done: true},
            {title: 'Item 3', done: false}
        ];

        getDataMock = jasmine.createSpy().and.callFake(function() {
                return todoData;    
            });
            
        addItemMock = jasmine.createSpy();
        deleteItemMock = jasmine.createSpy();
        updateItemMock = jasmine.createSpy();
        toggleDoneMock = jasmine.createSpy();
        removeDoneItemsMock = jasmine.createSpy();

        todoServiceMock = {
            getData: getDataMock,
            addItem: addItemMock,
            deleteItem: deleteItemMock,
            updateItem: updateItemMock,
            toggleDone: toggleDoneMock,
            removeDoneItems: removeDoneItemsMock
        }

        createController = function () {
            return $controller('todoListController', {
                '$rootScope':   $rootScope,
                '$scope':       $scope,
                'todoService':  todoServiceMock
            });
        };

        controller = createController();

    }));

    describe('The controller', function() {
        
        it('Should set the correct default value for newItem', function() {
            
            expect(controller.newItem).toBe('');
            
        }) ;  
            
        it('Should retrieve the todo data when the controller is activated', function() {
            
            expect(getDataMock).toHaveBeenCalled();
            expect(controller.todoData).toEqual(todoData);
            
        });

        it('Should watch the data in the todoService and update the local todoData when it changes', function() {
           
           todoData = ([
               {title: 'Item 4', done: false},
                {title: 'Item 5', done: false},
                {title: 'Item 6', done: false}
           ]);
           
           $scope.$digest();
           
           expect(controller.todoData).toEqual(todoData);
           
           todoData = ([
               {title: 'Item 7', done: false},
                {title: 'Item 8', done: true}
           ]);
           
           $scope.$digest();
           
           expect(controller.todoData).toEqual(todoData);

        });

    });
    
    describe('The addItem function', function() {
        
        it('Should call addItem in the todoService with the value of newItem and set newItem to an empty string', function() {
            
            controller.newItem = 'test';
            
            controller.addItem();
            
            expect(controller.newItem).toBe('');
            expect(addItemMock).toHaveBeenCalledWith('test');
            
            controller.newItem = 'foo';
            
            controller.addItem();
            
            expect(controller.newItem).toBe('');
            expect(addItemMock).toHaveBeenCalledWith('foo');
            
        });
        
    });
    
    describe('The deleteItem function', function() {
        
        it('Should call deleteItem in the todoService with the index', function() {
            
            controller.deleteItem(2);
            
            expect(deleteItemMock).toHaveBeenCalledWith(2);
            
            controller.deleteItem(5);
            
            expect(deleteItemMock).toHaveBeenCalledWith(5);
            
        });
        
    });
    
    describe('The removeDoneItems function', function() {
        
        it('Should call removeDoneItems in the todoService', function() {
            
            controller.removeDoneItems();
            
            expect(removeDoneItemsMock).toHaveBeenCalled();
            
        });
        
    });
    
    describe('The toggleItemDone function', function() {
        
        it('Should call toggleDone in the todoService with the index', function() {
            
            controller.toggleItemDone(2);
            
            expect(toggleDoneMock).toHaveBeenCalledWith(2);
            
            controller.toggleItemDone(5);
            
            expect(toggleDoneMock).toHaveBeenCalledWith(5);
            
        });
        
    });

});
