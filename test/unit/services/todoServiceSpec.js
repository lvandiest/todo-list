/* global describe, beforeEach, module, it, expect, jasmine */
'use strict';

describe('Given the todo service', function () {
        
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
    
});