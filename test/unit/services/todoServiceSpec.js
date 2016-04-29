/* global describe, beforeEach, module, it, expect, jasmine */
'use strict';

describe('Given the todo service', function () {
    
    describe('When there is existing todo data in local storage', function() {
        
        var todoService, getItemMock, setItemMock;

        getItemMock = jasmine.createSpy().and.callFake(function() {
            return [
                {title: 'Item 1', done: false},
                {title: 'Item 2', done: true},
                {title: 'Item 3', done: false}
            ]
        });
            
        setItemMock = jasmine.createSpy();
        
        beforeEach(function() {
            module('todoApp', function($provide) {
                $provide.factory('storageService', function() {
                    return {
                        getItem: getItemMock,
                        setItem: setItemMock
                    }
                });
            });
        });

        beforeEach(function() {
            angular.mock.inject(function ($injector) {
                todoService = $injector.get('todoService');
            });
        });
        
        describe('The service', function() {
            
            it('Should retrieve the data from local storage by calling getItem in the storage service when the service is initialized', function() {
                            
                expect(getItemMock).toHaveBeenCalledWith('todo');
        
            }); 
        
        });

        describe('The getData function', function() {
            
            it('Should return a copy of the data returned by the storage service', function() {
                    
                var expectedTodoData = [
                    {title: 'Item 1', done: false},
                    {title: 'Item 2', done: true},
                    {title: 'Item 3', done: false}
                ];
                
                var data = todoService.getData();
                
                expect(data).toEqual(expectedTodoData);
            
            });
        
        });
        
        describe('The addItem function', function() {
        
            it('Should add a new item to the todo data and send the updated data to the storage service', function() {
                
                var expectedData = [
                    {title: 'Item 1', done: false},
                    {title: 'Item 2', done: true},
                    {title: 'Item 3', done: false},
                    {title: 'New item', done: false}
                ];
                
                todoService.addItem('New item');
                
                expect(setItemMock).toHaveBeenCalledWith('todo', expectedData);
                expect(todoService.getData()).toEqual(expectedData);
                
                expectedData = [
                    {title: 'Item 1', done: false},
                    {title: 'Item 2', done: true},
                    {title: 'Item 3', done: false},
                    {title: 'New item', done: false},
                    {title: 'Newest item', done: false}
                ];
                
                todoService.addItem('Newest item');
                
                expect(setItemMock).toHaveBeenCalledWith('todo', expectedData);
                expect(todoService.getData()).toEqual(expectedData);
        
            });
        
        });
        
        describe('The deleteItem function', function() {
        
            it('Should remove an item from the todo data and send the updated data to the storage service', function() {
                
                var expectedData = [
                    {title: 'Item 1', done: false},
                    {title: 'Item 3', done: false}
                ];
                
                todoService.deleteItem(1);
                
                expect(todoService.getData()).toEqual(expectedData);
                expect(setItemMock).toHaveBeenCalledWith('todo', expectedData);
                
                expectedData = [
                    {title: 'Item 3', done: false}
                ];
                
                todoService.deleteItem(0);
                
                expect(todoService.getData()).toEqual(expectedData);
                expect(setItemMock).toHaveBeenCalledWith('todo', expectedData);
        
            });
        
        });
        
        describe('The updateItem function', function() {
        
            it('Should update the name of an item and send the updated data to the storage service', function() {
                
                var expectedData = [
                    {title: 'Item 1', done: false},
                    {title: 'Item 2', done: true},
                    {title: 'Updated item', done: false}
                ];
                
                todoService.updateItem(2, 'Updated item');
                
                expect(todoService.getData()).toEqual(expectedData);
                expect(setItemMock).toHaveBeenCalledWith('todo', expectedData);
                
                expectedData = [
                    {title: 'Item 1', done: false},
                    {title: 'Item 5', done: true},
                    {title: 'Updated item', done: false}
                ];
                
                todoService.updateItem(1, 'Item 5');
                
                expect(todoService.getData()).toEqual(expectedData);
                expect(setItemMock).toHaveBeenCalledWith('todo', expectedData);
        
            }); 
        
        });
        
        describe('The toggleDone function', function() {
        
            it('Should toggle the done parameter for an item and send the updated data to the storage service', function() {
                
                var expectedData = [
                    {title: 'Item 1', done: true},
                    {title: 'Item 2', done: false},
                    {title: 'Item 3', done: false}
                ];
                
                todoService.toggleDone(0);
                todoService.toggleDone(1);
                
                expect(todoService.getData()).toEqual(expectedData);
                expect(setItemMock).toHaveBeenCalledWith('todo', expectedData);
                
                expectedData = [
                    {title: 'Item 1', done: true},
                    {title: 'Item 2', done: true},
                    {title: 'Item 3', done: false}
                ];
                
                todoService.toggleDone(1);
                
                expect(todoService.getData()).toEqual(expectedData);
                expect(setItemMock).toHaveBeenCalledWith('todo', expectedData);
        
            }); 
        
        });
        
        describe('The removeDoneItems function', function() {
        
            it('Should remove all items marked as done from the todo data and send the updated data to the storage service', function() {
                
                var expectedData = [
                    {title: 'Item 1', done: false},         
                    {title: 'Item 3', done: false}           
                ];
                
                todoService.removeDoneItems();
                
                expect(todoService.getData()).toEqual(expectedData);
                expect(setItemMock).toHaveBeenCalledWith('todo', expectedData);
        
            }); 
        
        });
        
    });
    
    describe('When there is no existing todo data in local storage', function() {
    
        var todoService, getItemMock, setItemMock;

        getItemMock = jasmine.createSpy().and.returnValue(null);
            
        setItemMock = jasmine.createSpy();
        
        beforeEach(function() {
            module('todoApp', function($provide) {
                $provide.factory('storageService', function() {
                    return {
                        getItem: getItemMock,
                        setItem: setItemMock
                    }
                });
            });
        });

        beforeEach(function() {
            angular.mock.inject(function ($injector) {
                todoService = $injector.get('todoService');
            });
        });

        describe('The getData function', function() {
            
            it('Should return an empty array', function() {
                    
                expect(todoService.getData()).toEqual([]);
            
            });
        
        });
    
    });
    
});