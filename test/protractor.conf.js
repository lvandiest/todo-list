var grunt = require('grunt');
var mkdirp = require('mkdirp');

var htmlReportDirectory = 'reports/protractor/html/';
mkdirp(htmlReportDirectory);

var Jasmine2ScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new Jasmine2ScreenshotReporter({
    dest: htmlReportDirectory,
    cleanDestination: false,
    showSummary: true,
    showConfiguration: false,
    reportTitle: null,
    filename: 'report.html',
    reportOnlyFailedSpecs: false,
    captureOnlyFailedSpecs: true
});

exports.config = {

	seleniumAddress: 'http://localhost:4444/wd/hub',
	
	specs: [
		'protractor/specs/**/*Spec.js',
	],
    
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: false
    },
    
	baseUrl: 'http://localhost:9000',

    framework: 'jasmine2',

    beforeLaunch: function() {
        reporter.beforeLaunch(function() {});
    },
    
    onPrepare: function() {
        jasmine.getEnv().addReporter(reporter);
    },
    
    afterLaunch: function(exitCode) {
        reporter.afterLaunch(function() {});

        function formatDatePart(input) {
            input = input < 10 ? '0' + input.toString() : input.toString();
            return input;
        }

        var d = new Date();
        var timestamp = d.getFullYear().toString() + formatDatePart(d.getMonth() + 1) + formatDatePart(d.getDate()) + 'T' + formatDatePart(d.getHours()) + formatDatePart(d.getMinutes());

        var newDirectory = htmlReportDirectory + timestamp + '/';

        mkdirp(newDirectory);

        grunt.file.expand(htmlReportDirectory + '/*.html').forEach(function (file) {
            grunt.file.copy(file, file.replace(htmlReportDirectory, newDirectory));
            grunt.file.delete(file);
        });

        grunt.file.expand(htmlReportDirectory + '/*.png').forEach(function (file) {
            grunt.file.copy(file, file.replace(htmlReportDirectory, newDirectory));
            grunt.file.delete(file);
        });

    },

	jasmineNodeOpts: {
		// onComplete will be called just before the driver quits.
		onComplete: null,
		// If true, display spec names.
		isVerbose: false,
		// If true, print colors to the terminal.
		showColors: true,
		// If true, include stack traces in failures.
		includeStackTrace: true,
		// Default time to wait in ms before a test fails.
		defaultTimeoutInterval: 30000
	}
};
