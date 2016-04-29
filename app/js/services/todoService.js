 /**
 * @ngdoc service
 * @name todoApp.factory:todoService
 * @description Service for retrieving and modifying the todo list data.
 * @requires todoApp.factory:storageService
 */

(function() {
'use strict';

    angular
        .module('todoApp')
        .factory('todoService', todoService);
        
    todoService.$inject = ['storageService'];
    function todoService(storageService) {
        
        var service = {
            addItem: addItem,
            deleteItem: deleteItem,
            getData: getData,
            removeDoneItems: removeDoneItems,
            toggleDone: toggleDone,
            updateItem: updateItem
        };
        
        var storageKey = 'todo';
        
        var data = storageService.getItem(storageKey);
        var todoData = data ? data : [];
        
        return service;

        ////////////////
        
         /**
          * @ngdoc method
          * @name addItem
          * @description Adds a new item to the list, and sends the updated data to the storage service
          * @methodOf exampleApp.factory:todoService
          * @param {String} title Title of the new todo item.
          */
         function addItem(title) {
             
             todoData.push({title: title, done: false});
             sendToStorage();
             
         }
         
          /**
          * @ngdoc method
          * @name deleteItem
          * @description Removes the item at the specified index, and sends the updated data to the storage service
          * @methodOf exampleApp.factory:todoService
          * @param {Number} index Index of the item to remove.
          */
         function deleteItem(index) {
             
             todoData.splice(index, 1);
             sendToStorage();
             
         }
         
        /**
         * @ngdoc method
         * @name getData
         * @description Returns a copy of the todo list data from local storage.
         * @methodOf exampleApp.factory:todoService
         * @returns {Object} JSON array with the todo items. 
         */
        function getData() {
            
            return todoData;
            
         }
         
         /**
          * @ngdoc method
          * @name removeDoneItems
          * @description Removes all items marked as done from the data.
          * @methodOf exampleApp.factory:todoService
          */
         function removeDoneItems() {
             
            for (var i=todoData.length-1; i>=0; i--) {
                if (todoData[i].done) {
                    todoData.splice(i, 1);
                }
            }
             
             sendToStorage();
             
         }
         
         /**
          * @ngdoc method
          * @name toggleDone
          * @description Toggles the 'done' attribute of a todo item.
          * @methodOf exampleApp.factory:todoService
          * @param {Number} index Index of the item to toggle.
          */
         function toggleDone(index) {
             
             todoData[index].done = todoData[index].done ? false : true;
             sendToStorage();
             
         }
         
         /**
          * @ngdoc method
          * @name updateItem
          * @description Updates the title of a todo item.
          * @methodOf exampleApp.factory:todoService
          * @param {Number} index Index of the item to update.
          * @param {String} title The new title of the item.
          */
         function updateItem(index, title) {
             
             todoData[index].title = title;
             sendToStorage();
             
         }
         
         ////////////////
         
         // private function to send the data to the local storage service
         function sendToStorage() {
             storageService.setItem(storageKey, todoData);
         }
        
    }
})();