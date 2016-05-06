'use strict';

/* global require, describe, it, expect, browser, beforeEach */

var LocalStoragePageObject = require('../pageObjects/localStoragePageObject').localStoragePageObject;
var TodoListPageObject = require('../pageObjects/todoListPageObject').todoListPageObject;

describe('The todo list', function() {
    
    var localStorage = new LocalStoragePageObject();
    var todoList = new TodoListPageObject();
    var pageurl = 'app/index.html';
    
    it('Should reset the data in local storage', function() {
        
        browser.get(pageurl);        
        
        localStorage.removeItem('todo');
        
        expect(localStorage.getItem('todo')).toBe(null);
        
    });
    
    it('Should show the todo list', function() {
        
        browser.get(pageurl);        
        
        expect(todoList.element().isDisplayed()).toBe(true);
        
    });
    
    it('Should show an input field for adding a new todo item and a message that there are no current todo items', function() {       
        
        browser.get(pageurl);
        
        expect(todoList.newItemInput().isDisplayed()).toBe(true);
        expect(todoList.newItemInput().getAttribute('placeholder')).toBe('What needs to be done?');
        
        expect(todoList.noItemsMessage().isDisplayed()).toBe(true);
        expect(todoList.noItemsMessage().getText()).toEqual('Nothing to do at the moment!');
        
        expect(todoList.removeDoneItemsLink().isPresent()).toBe(false);
        
    });
    
    it('Should add a new todo item to the list when a value is entered into the input field and enter is pressed and clear the input after it\'s added', function() {
        
        todoList.addNewItem('First thing to do');
        expect(todoList.newItemInput().getAttribute('value')).toBe('');
        expect(todoList.todoItem(1).isDisplayed()).toBe(true);
        expect(todoList.todoItem(1).title().text()).toBe('First thing to do');
        
        todoList.addNewItem('Second thing to do');
        expect(todoList.newItemInput().getAttribute('value')).toBe('');
        expect(todoList.todoItem(2).isDisplayed()).toBe(true);
        expect(todoList.todoItem(2).title().text()).toBe('Second thing to do');
        
        todoList.addNewItem('Third thing to do');
        expect(todoList.newItemInput().getAttribute('value')).toBe('');
        expect(todoList.todoItem(3).isDisplayed()).toBe(true);
        expect(todoList.todoItem(3).title().text()).toBe('Third thing to do');
        
        todoList.addNewItem('Fourth thing to do');
        expect(todoList.newItemInput().getAttribute('value')).toBe('');
        expect(todoList.todoItem(4).isDisplayed()).toBe(true);
        expect(todoList.todoItem(4).title().text()).toBe('Fourth thing to do');
        
        todoList.addNewItem('Last thing to do');
        expect(todoList.newItemInput().getAttribute('value')).toBe('');
        expect(todoList.todoItem(5).isDisplayed()).toBe(true);
        expect(todoList.todoItem(5).title().text()).toBe('Last thing to do');
        
    });
    
    it('Should change the title of a todo item to an input field when it\'s double clicked', function() {
        
        expect(todoList.todoItem(3).title().input().isPresent()).toBe(false);
        
        todoList.todoItem(3).title().doubleClick();
        
        expect(todoList.todoItem(3).title().input().isDisplayed()).toBe(true);
        
    });
    
    it('Should cancel editing when the input field loses focus', function() {
        
        todoList.todoItem(3).title().input().clear();
        todoList.todoItem(3).title().input().sendKeys('Editing the title');
        todoList.todoItem(2).click();
        
        expect(todoList.todoItem(3).title().text()).toBe('Third thing to do');
        expect(todoList.todoItem(3).title().input().isPresent()).toBe(false);
        
    });
    
    it('Should change the title of the object after double clicking, changing the value and pressing enter', function() {
        
        todoList.todoItem(3).changeTitle('Thing to do #3');
        expect(todoList.todoItem(3).title().text()).toBe('Thing to do #3');
        expect(todoList.todoItem(3).title().input().isPresent()).toBe(false);
        
        todoList.todoItem(1).changeTitle('Foo thing to do');
        expect(todoList.todoItem(1).title().text()).toBe('Foo thing to do');
        expect(todoList.todoItem(1).title().input().isPresent()).toBe(false);
        
    });
    
    it('Should toggle an item between done and todo when the markAsDoneBtn is clicked', function() {
        
        expect(todoList.todoItem(3).isDone()).toBe(false);
        todoList.todoItem(3).markAsDoneBtn().click();
        expect(todoList.todoItem(3).isDone()).toBe(true);
        
        expect(todoList.todoItem(2).isDone()).toBe(false);
        todoList.todoItem(2).markAsDoneBtn().click();
        expect(todoList.todoItem(2).isDone()).toBe(true);
        
        expect(todoList.todoItem(2).isDone()).toBe(true);
        todoList.todoItem(2).markAsDoneBtn().click();
        expect(todoList.todoItem(2).isDone()).toBe(false);
        
        expect(todoList.todoItem(5).isDone()).toBe(false);
        todoList.todoItem(5).markAsDoneBtn().click();
        expect(todoList.todoItem(5).isDone()).toBe(true);
        
    });
    
    it('Should remove an item from the list when the removeBtn is clicked', function() {
        
        todoList.todoItem(1).removeBtn().click();
        expect(todoList.todoItem(1).title().text()).toBe('Second thing to do');
        expect(todoList.todoItem(2).title().text()).toBe('Thing to do #3');
        expect(todoList.todoItem(3).title().text()).toBe('Fourth thing to do');
        expect(todoList.todoItem(4).title().text()).toBe('Last thing to do');
        expect(todoList.todoItem(5).isPresent()).toBe(false);
        
        todoList.todoItem(3).removeBtn().click();
        expect(todoList.todoItem(1).title().text()).toBe('Second thing to do');
        expect(todoList.todoItem(2).title().text()).toBe('Thing to do #3');
        expect(todoList.todoItem(3).title().text()).toBe('Last thing to do');
        expect(todoList.todoItem(4).isPresent()).toBe(false);
        
    });
    
    it('Should show a link for removing all done items and remove all done items when it\'s clicked', function() {
        
        expect(todoList.removeDoneItemsLink().isDisplayed()).toBe(true);
        expect(todoList.removeDoneItemsLink().getText()).toBe('Remove done items');
        
        todoList.removeDoneItemsLink().click();
        
        expect(todoList.todoItem(1).title().text()).toBe('Second thing to do');
        expect(todoList.todoItem(2).isPresent()).toBe(false);
        
    });
     
});