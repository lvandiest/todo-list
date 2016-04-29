# Todo list app
Example application for demonstrating unit testing, TDD and E2E testing.

Includes configurations for running Karma unit test with code coverage and Protractor E2E tests.

## Getting started
This project uses NPM, Grunt and Bower.

If you don't have NPM installed you can get it here:
https://www.npmjs.com/

If you don't have Grunt and/or Bower you can install them with NPM:
```
$ npm install grunt -g
$ npm install bower -g
```

Once Grunt and Bower are installed go to the project directory and install all required NPM modules and dependecies:
```
$ npm install
$ bower install
```

## Grunt tasks

### Starting a local web server
Use the following command to start a local webserver:
```
$ grunt server --serverPort=[port]
```

### Running unit tests
The following command will run all unit tests and open the code coverage report in your default browser:
```
grunt unit-test
```