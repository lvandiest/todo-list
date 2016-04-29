/**
 * @ngdoc directive
 * @name todoApp.directive:autoFocus
 * @restrict A
 * @description 
 * Directive that puts focus on the element it's placed on when that element is rendered.
 * 
 * @example
    <example module="todoApp">
        <file name="example.html">
            <input class="form-control" type="text" auto-focus />
        </file>
    </example>
 */

(function() {
  'use strict';

  angular
    .module('todoApp')
    .directive('autoFocus', autoFocus);

  autoFocus.$inject = ['$timeout'];
  function autoFocus($timeout) {
    
    var directive = {
        link: link,
        restrict: 'A'
    };
    
    return directive;
    
    function link(scope, element) {
        $timeout(function () {
            element[0].focus();
        });
    }
    
  }
  
})();