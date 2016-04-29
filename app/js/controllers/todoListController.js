 /**
 * @ngdoc controller
 * @name todoApp.controller:todoListController
 * @description Controller for the todo list.
 * @requires todoApp.factory:todoService
 */

(function() {
'use strict';

    angular
        .module('todoApp')
        .controller('todoListController', todoListController);

    todoListController.$inject = ['$scope', 'todoService'];
    function todoListController($scope, todoService) {
        
        var vm = this;
        
        vm.addItem = addItem;
        vm.deleteItem = deleteItem;
        vm.newItem = '';
        vm.removeDoneItems = removeDoneItems;
        vm.toggleItemDone = toggleItemDone;
        
        activate();

        ////////////////
        
        function activate() {
            vm.todoData = todoService.getData();
        }
        
        /**
         * @ngdoc method
         * @name addItem
         * @description Calls addItem in the todoService with the value of newItem and sets newItem to an empty string
         * @methodOf exampleApp.controller:todoListController
         */
        function addItem() {
            todoService.addItem(vm.newItem);
            vm.newItem = '';
        }
        
        /**
         * @ngdoc method
         * @name deleteItem
         * @description Calls deleteItem in the todoService with the index to remove the item from the list.
         * @param {Number} index Index of the item to remove.
         * @methodOf exampleApp.controller:todoListController
         */
        function deleteItem(index) {
            todoService.deleteItem(index);
        }
        
        /**
         * @ngdoc method
         * @name removeDoneItems
         * @description Calls removeDoneItems in the todoService to remove all done items from the list.
         * @methodOf exampleApp.controller:todoListController
         */
        function removeDoneItems() {
            todoService.removeDoneItems();
        }
        
        /**
         * @ngdoc method
         * @name toggleItemDone
         * @description Calls toggleDone in the todoService with the index to toggle the done parameter of a todo item.
         * @param {Number} index Index of the item to toggle.
         * @methodOf exampleApp.controller:todoListController
         */
        function toggleItemDone(index) {
            todoService.toggleDone(index);
        }
        
        ////////////////
        
        // Watch the todo data in the todo service and update the local data when it changes
        $scope.$watch(function() {
            return todoService.getData();
        }, function(data) {
            vm.todoData = data;
        }, true);
         
    }
})();
