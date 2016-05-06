'use strict';

/* global require, describe, it, expect, browser, beforeEach */

var LocalStoragePageObject = require('../pageObjects/localStoragePageObject').localStoragePageObject;
var TodoListPageObject = require('../pageObjects/todoListPageObject').todoListPageObject;

describe('The todo list', function() {
    
    var localStorage = new LocalStoragePageObject();
    var todoList = new TodoListPageObject();
    var pageurl = 'app/index.html';
    
});