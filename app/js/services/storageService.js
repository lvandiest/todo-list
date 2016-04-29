 /**
 * @ngdoc service
 * @name todoApp.factory:storageService
 * @description Service for saving JSON data in HTML local storage.
 */

(function() {
'use strict';

    angular
        .module('todoApp')
        .factory('storageService', storageService);

    function storageService() {
        
        var service = {
            getItem: getItem,
            removeItem: removeItem,
            setItem: setItem
        };
        
        return service;

        ////////////////
        
        /**
         * @ngdoc method
         * @name getItem
         * @description Retrieves data from local storage and parses it to a JSON object.
         * @methodOf exampleApp.factory:storageService
         * @param {String} key Key of the item to get.
         * @returns {Object} JSON object retrieved from local storage. 
         */
        function getItem(key) {
            
            var data = localStorage.getItem(key);
            return JSON.parse(data);
            
         }
         
         /**
         * @ngdoc method
         * @name removeItem
         * @description Removes an item from local storage.
         * @methodOf exampleApp.factory:storageService
         * @param {string} key Key of the object that needs to be removed.
         */
        function removeItem(key) {
            
            localStorage.removeItem(key);
                  
        }
        
        /**
         * @ngdoc method
         * @name setItem
         * @description Stringifies JSON data and saves it in the local storage.
         * @methodOf exampleApp.factory:storageService
         * @param {string} key Key to save the data on.
         * @param {Object} data Object containing the data that needs to be saved.
         */
        function setItem(key, data) {
            
            var dataAsString = JSON.stringify(data);
            localStorage.setItem(key, dataAsString);
            
        }
        
    }
})();