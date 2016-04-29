/* global describe, beforeEach, module, it, expect, inject */
'use strict';

describe('Given the auto-focus directive', function () {

    var element, $scope, timeout;

    beforeEach(function () {

        module('todoApp');

        inject(function ($rootScope, $compile, $timeout) {
            $scope = $rootScope.$new();
            timeout = $timeout;
            
            element = angular.element(
                '<input type="text" auto-focus />'
            );

            $compile(element)($scope);
            $scope.$digest();
            
        });

    });

    it('Should focus on the element', function() {

        spyOn(element[0],'focus');
        timeout.flush();
        expect(element[0].focus).toHaveBeenCalled();

    });

});