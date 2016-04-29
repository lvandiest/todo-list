/* global describe, beforeEach, module, it, spyOn, expect, inject */
'use strict';

describe('Given the storage service', function () {

    var storageService;

    beforeEach(module('todoApp'));

    beforeEach(function() {
       inject(function ($injector) {
            storageService = $injector.get('storageService');
        });
    });

    describe('The getItem function', function () {

        it('Should retrieve the item with the key from local storage and parse the data to JSON', function() { 
            
            var jsonData = {foo: 'bar'};
            spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(jsonData));
            
            var data = storageService.getItem('test');
            
            expect(localStorage.getItem).toHaveBeenCalledWith('test');
            expect(data).toEqual(jsonData);
            
            storageService.getItem('foo');
            
            expect(localStorage.getItem).toHaveBeenCalledWith('foo');
            
        });
    
    });
    
    describe('The removeItem function', function () {

        it('Should call localStorage.removeItem with the key', function() { 
            
            spyOn(localStorage, 'removeItem');
            
            storageService.removeItem('test');
            
            expect(localStorage.removeItem).toHaveBeenCalledWith('test');
            
            storageService.removeItem('foo');
            
            expect(localStorage.removeItem).toHaveBeenCalledWith('foo');
            
        });
    
    });
    
    describe('The setItem function', function () {

        it('Should call localStorage.setItem with the key and stringified JSON data', function() { 
            
            var jsonData = {foo: 'bar'};
            spyOn(localStorage, 'setItem');
            
            storageService.setItem('test', jsonData);
            
            expect(localStorage.setItem).toHaveBeenCalledWith('test', JSON.stringify(jsonData));
            
            storageService.setItem('foo', jsonData);
            
            expect(localStorage.setItem).toHaveBeenCalledWith('foo', JSON.stringify(jsonData));
            
        });
    
    });

});
