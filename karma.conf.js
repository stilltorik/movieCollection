module.exports = function ( karma ) {

    karma.set({
        basePath: './',
        files: [
            'src/main/**/*.js',
            'src/test/js/**/*.js'//,
            //'vendor/jquery/dist/jquery.min.js'
        ],
        exclude: ['src/main/js/all.min.js', 'src/main/js/vendor.min.js', 'src/main/mainCtrl.js', 'src/main/view/*.js'],
        frameworks: ['jasmine', 'sinon' ],
        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-junit-reporter',
            'karma-html2js-preprocessor',
            'karma-threshold-reporter',
            'karma-sinon'
        ],
        preprocessors: {
            'src/main/js/**/*.js': ['coverage']
        },
        reporters:  ['progress', 'junit','dots', 'coverage','threshold'],
        thresholdReporter: {
            statements: 0,
            branches: 0,
            functions: 0,
            lines: 0
        },
        coverageReporter: {
            dir: 'target-grunt',
            reporters: [{
                type: 'cobertura',
                subdir: 'cobertura',
                file: 'coverage.xml'
            }, {
                type: 'html',
                subdir: 'coverage/'
            }]
        },
        junitReporter: {
            outputFile: 'target-grunt/junit/report.xml',
            suite: 'movieCollection'
        },
        client:{
            captureConsole: false
        }
    });
};

