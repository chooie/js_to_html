module.exports = function(config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: "../../../",

    // frameworks to use
    frameworks: ["mocha", "commonjs"],

    // list of files / patterns to load in the browser
    files: [
      // Include all files except server
      "src/application/!(server)/**/!(*.page).js",
      {
        // Don't automatically request in iframe any non-js files - but make
        // them available to be served
        pattern: "src/application/client/content/**/!(!(*.page)*.js)",
        included: false
      }
    ],

    // list of files to exclude
    exclude: [],

    // preprocessors
    preprocessors: {
      // Include all files except server
      "src/application/!(server)/**/!(*.page).js": ["commonjs"],
      "src/application/client/content/**/*.page.js": ["js_to_html"]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ["dots"],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR ||
    // config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file
    // changes
    autoWatch: false,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,

    // If no message received from browser in [ms] while running tests,
    // disconnect it
    browserNoActivityTimeout: 30000,

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
