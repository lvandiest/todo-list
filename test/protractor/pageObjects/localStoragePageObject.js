 /* global module, browser */
 
 /**
 * @ngdoc interface
 * @name localStoragePageObject
 * @description Page object for interacting with local storage.
 */

module.exports.localStoragePageObject = function() {
    
    'use strict';
    
    /**
     * @ngdoc method
     * @name localStoragePageObject.getItem
     * @description Calls localStorage to return a stored item.
     * @methodOf localStoragePageObject
     * @param {String} key Key of the item to get.
     * @returns {String} The data from local storage.
     */
    this.getItem = function (key) {
        return browser.executeScript('window.localStorage.getItem("' + key + '");');
    };
    
    /**
     * @ngdoc method
     * @name localStoragePageObject.setItem
     * @description Calls localStorage to store an item.
     * @methodOf localStoragePageObject
     * @param {String} key Key of the item to store.
     * @param {String} value Value of the item to store.
     */
    this.setItem = function (key, value) {
        browser.executeScript("window.localStorage.setItem('" + key + "', '" + value + "');");
    };
    
    /**
     * @ngdoc method
     * @name localStoragePageObject.removeItem
     * @description Calls localStorage to remove a stored item.
     * @methodOf localStoragePageObject
     * @param {String} key Key of the item to remove.
     */
    this.removeItem = function (key) {
        browser.executeScript('window.localStorage.removeItem("' + key + '");');
    };
    
}