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

});
