/**
 * @ngdoc directive
 * @name todoApp.directive:todoItemTitle
 * @restrict EA
 * @param {String} title Title of the todo item.
 * @param {String} index Index of the todo item.
 * @requires todoApp.factory:todoService
 * 
 * @description 
 * Directive that creates an editable title for todo items in the todo list. Double clicking the title
 * turns it into an input field. Pressing enter saves the input, clicking outside the input field cancels editing.
 * 
 * @example
    <example module="todoApp">
        <file name="example.html">
            <div ng-controller="exampleCtrl as example">
                <ul class="list-group">
                    <li class="list-group-item" ng-repeat="todoItem in example.todoData">
                        <div todo-item-title title="todoItem.title" index="$index" />
                    </li>
                </ul>
            </div>
        </file>
        <file name="controller.js">
            angular
                .module('todoApp')
                .controller('exampleCtrl', exampleCtrl); 
                
                exampleCtrl.$inject = ['storageService'];
                function exampleCtrl(storageService) {
                    
                    var vm = this;
                    
                    vm.todoData = [
                        {title: 'First thing to do', done: false},
                        {title: 'Second thing to do', done: false},
                        {title: 'Third thing to do', done: false}
                    ];
                    
                    storageService.setItem('todo', vm.todoData);
                    
                }
        </file>
    </example>
 */

(function() {
    'use strict';

    angular
        .module('todoApp')
        .directive('todoItemTitle', todoItemTitle);

    function todoItemTitle() {
        
        var directive = {
            bindToController: true,
            controller: todoItemTitleController,
            controllerAs: 'vm',
            replace: true,
            scope: {
                title: '=',
                index: '='
            },
            template: '<div class="todo-item-title">' +
            '   <div ng-if="vm.state.status === 1">' +
            '       <div class="todo-item-title-activator" ng-dblclick="vm.edit()" ng-if="vm.state.status === 1">{{vm.title}}</div>' +
            '   </div>' +
            '   <div ng-if="vm.state.status === 2">' +
            '       <form ng-submit="vm.save()" ng-if="vm.state.status === 2">' +
            '           <input class="form-control" type="text" name="todoInput" ng-model="vm.newValue" ng-blur="vm.cancel()" auto-focus />' +
            '       </form>' +
            '   </div>' +
            '</div>'
        };
        
        return directive;
        
    }
    
    todoItemTitleController.$inject = ['$element', 'todoService'];
    function todoItemTitleController ($element, todoService) {
        
        var vm = this;
        
        vm.edit = edit;
        vm.cancel = cancel;
        vm.index = parseInt(vm.index);
        vm.save = save;
        vm.state = {
            VIEW: 1,
            EDIT: 2,
            status: 1
        }
        
        ////////////////
        
        function cancel() {
            vm.state.status = vm.state.VIEW;
        }
        
        function edit() {
            vm.newValue = vm.title;
            vm.state.status = vm.state.EDIT;
        }
        
        function save() {
            vm.title = vm.newValue;
            todoService.updateItem(vm.index, vm.title);            
            vm.state.status = vm.state.VIEW;
        }
        
    }
    
})();