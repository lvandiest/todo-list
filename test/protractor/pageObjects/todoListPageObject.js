/* global module, protractor, element, by, browser */
 
 /**
 * @ngdoc interface
 * @name todoListPageObject
 * @description Page object for the todo list.
 */

module.exports.todoListPageObject = function() {
    
    'use strict';
    
    /**
     * @ngdoc method
     * @name todoListPageObject.element
     * @description Returns the todo list container element.
     * @methodOf todoListPageObject
     * @returns {Object} The todo list element.
     */
    this.element = function() {
        return element(by.css('div[ng-controller="todoListController as todolist"]'));
    }
    
    /**
     * @ngdoc method
     * @name todoListPageObject.newItemInput
     * @description Returns the input field used to add a new todo item.
     * @methodOf todoListPageObject
     * @returns {Object} The input element.
     */
    this.newItemInput = function() {
        
        return element(by.css('.panel-heading input.form-control[ng-model="todolist.newItem"]'));
    }
    
    /**
     * @ngdoc function
     * @name addNewItem
     * @description Function that adds a new todo item by entering the title into the newItemInput field and pressing enter.
     * @methodOf todoListPageObject
     * @param {String} title Title of the new todo item.
     */
    this.addNewItem = function(title) {
        this.newItemInput().sendKeys(title, protractor.Key.ENTER)
    }
    
    /**
     * @ngdoc method
     * @name todoListPageObject.todoItem
     * @description Returns the todo item at the specified position.
     * @methodOf todoListPageObject
     * @param {Number} index Index of the todo item to return.
     * @returns {Object} The todo item element.
     */
    this.todoItem = function(eq) {
        
        var todoItem = element(by.css('ul.list-group.todo-list .list-group-item.todo-item:nth-of-type(' + eq + ')'));
        
        /**
         * @ngdoc function
         * @name todoItem > title
         * @description Returns the title element of the todo item.
         * @methodOf todoListPageObject
         * @returns {Object} The title element.
         */
        todoItem.title = function() {
            
            var title = todoItem.element(by.css('.todo-item-title'));
            
            /**
             * @ngdoc function
             * @name todoItem > title > text
             * @description Returns the text of the title.
             * @methodOf todoListPageObject
             * @returns {String} The text.
             */
            title.text = function() {
                return title.getText();
            }
            
            /**
             * @ngdoc function
             * @name todoItem > title > doubleClick
             * @description Double clicks the title to switch it to edit mode
             * @methodOf todoListPageObject
             */
            title.doubleClick = function() {
                browser.actions().doubleClick(title.element(by.css('.todo-item-title-activator'))).perform();
            }
            
            /**
             * @ngdoc function
             * @name todoItem > title > input
             * @description Returns the input element of the title.
             * @methodOf todoListPageObject
             * @returns {Object} The input element.
             */
            title.input = function() {
                
                var input = title.element(by.css('input[name=todoInput]'));
                
                return input;
            }
            
            return title;
        }
        
        /**
         * @ngdoc function
         * @name todoItem > markAsDoneBtn
         * @description Return the button that marks the item as done.
         * @methodOf todoListPageObject
         * @returns {Object} The button element.
         */
        todoItem.markAsDoneBtn = function() {
            return todoItem.element(by.css('a.todo-done-btn'));
        }
        
        /**
         * @ngdoc function
         * @name todoItem > removeBtn
         * @description Returns the button that removes the item from the list.
         * @methodOf todoListPageObject
         * @returns {Object} The button element.
         */
        todoItem.removeBtn = function() {
            return todoItem.element(by.css('a.todo-remove-btn'));
        }
        
        /**
         * @ngdoc function
         * @name todoItem > isDone
         * @description Returns wheter or not the item is done.
         * @methodOf todoListPageObject
         * @returns {Boolean} True when the item is done, false when it's not.
         */
        todoItem.isDone = function() {
            return todoItem.getAttribute('class').then(
                function(classes) {
                    return classes.split(' ').indexOf('list-group-item-success') > -1;
                }
            )
        }
        
        /**
         * @ngdoc function
         * @name todoItem > changeTitle
         * @description Function that changes the title of a todo item by double clicking it, changing it and saving it by pressing enter.
         * @methodOf todoListPageObject
         * @param {String} title The new title for the item.
         */
        todoItem.changeTitle = function(title) {
            todoItem.title().doubleClick();
            todoItem.title().input().clear();
            todoItem.title().input().sendKeys(title, protractor.Key.ENTER);
        }
        
        return todoItem;
    }
    
    /**
     * @ngdoc method
     * @name todoListPageObject.removeDoneItemsLink
     * @description Returns the the link for deleting all done items.
     * @methodOf todoListPageObject
     * @returns {Object} The link element.
     */
    this.removeDoneItemsLink = function() {
        return element(by.css('.panel-footer a[ng-click="todolist.removeDoneItems()"]'));
    }
    
    /**
     * @ngdoc method
     * @name todoListPageObject.noItemsMessage
     * @description Returns the element containing a message when no todo items are present.
     * @methodOf todoListPageObject
     * @returns {Object} The element.
     */
    this.noItemsMessage = function() {
        return element(by.css('.panel-body[ng-if="todolist.todoData.length === 0"]'));
    }
    
};