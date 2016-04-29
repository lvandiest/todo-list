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

});
