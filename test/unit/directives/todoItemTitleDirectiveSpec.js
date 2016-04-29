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

});